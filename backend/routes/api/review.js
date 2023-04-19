const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
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
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const result = {}
    const allReviews = await Review.findAll({
        where: {
            userId: userId
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
    result.Reviews = allReviews
    res.status(200).json(result)
});

// add/posts images for reviewImages
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    const { url } = req.body;
    if(!review) {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    const newImage = await ReviewImage.create({
        reviewId: parseInt(reviewId),
        url
    });

    if(newImage.id > 10) {
        res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        });
    };

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
    if(!oneReview) {
        res.status(404).json({
            message: "Review couldn't be found"
        });
    };
    const { review, stars } = req.body;

    oneReview.review = review
    oneReview.stars = stars

    await oneReview.save();

    res.status(200).json(oneReview)
})

module.exports = router;