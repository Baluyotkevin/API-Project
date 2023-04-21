const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// gets all reviews from current user 
// in live it does not show? but it does in local
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const result = {};
    const allReviews = await Review.findAll({
        where: {
            userId: currentUser
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['email', 'username', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'preview', 'reviewId']
                }
            },
    ]
    }); 

    let allReviewsArr = [];
    for (let review of allReviews) {
        review = review.toJSON();
        const allImages = await SpotImage.findAll({
            where: {
                spotId :review.Spot.id
            }
        });

        let imagesArray = [];
        for (let image of allImages) {
            image = image.toJSON()
            if(review.Spot.id === image.spotId) {
                imagesArray.push(image.url)
            };
        };

        review.Spot.previewImage = imagesArray;
        allReviewsArr.push(review);
    };

    result.Reviews = allReviewsArr;
    res.status(200).json(result);
});

// add/posts images for reviewImages
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const currentUser = req.user.id
    const review = await Review.findByPk(reviewId);
    const { url } = req.body;
    if(!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    };

    const reviewOwner = review.userId
    if (currentUser !== reviewOwner) {
        return res.status(403).json({
            message: "You are not authorized to add images to this review >:("
        });
    };

    const imageCount = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    });

    if ((imageCount.length + 1) > 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        });
    };

    const newImage = await ReviewImage.create({
        reviewId: parseInt(reviewId),
        url
    });

    const newImageBody = {
        id: newImage.id,
        url: newImage.url
    };

    res.status(200).json(newImageBody);
});

// edits a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const reviewId = req.params.reviewId;
    const oneReview = await Review.findByPk(reviewId)
    const currentUser = req.user.id;
    const { review, stars } = req.body;
    if(!oneReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    };

    const reviewOwner = oneReview.userId;
    if(currentUser !== reviewOwner) {
        return res.status(403).json({
            message: "You are not authorized to edit this booking"
        });
    };

    oneReview.review = review
    oneReview.stars = stars

    await oneReview.save();

    res.status(200).json(oneReview)
})

// deletes a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const currentUser = req.user.id;
    const review = await Review.findByPk(reviewId);
    if(!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    };
    
    const reviewOwner = review.userId;
    if (currentUser !== reviewOwner) {
        return res.status(403).json({
            message: "You are not authorized to edit this booking >:("
        });
    }

   await review.destroy()
    res.status(200).json({
        message: "Successfully deleted"
    });
});


module.exports = router;