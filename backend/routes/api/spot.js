const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSpots = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
      .withMessage('State is required"'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
      
    handleValidationErrors
  ];

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
  
// gets all spots from currentUser
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const allSpots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    })
    const allReviews = await Review.findAll()
    const allImages = await SpotImage.findAll()
    const result = {Spots: []};

    for (let spot of allSpots) {
        spot = spot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(spot.id === review.spotId) {
                total += review.stars
                length++
            }
        }

        let imagesArray = [];
        for (let image of allImages) {
            image = image.toJSON()
            if(spot.id === image.spotId) {
                imagesArray.push(image.url)
            }
        }

        spot.avgRating = total / length
        spot.previewImages = imagesArray
        if(!spot.avgRating) {
            spot.avgRating = 'Has not been rated yet ;('
        }
        if(!spot.previewImages.length) {
            spot.previewImages = 'No images ;( available'
        }
        result.Spots.push(spot)
    }
    res.status(200).json(result)
});

// gets all spots
router.get('/' , async (req, res) => {
    const allSpots = await Spot.findAll()
    const allReviews = await Review.findAll()
    const allImages = await SpotImage.findAll()
    const result = {Spots: []};

    for (let spot of allSpots) {
        spot = spot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(spot.id === review.spotId) {
                total += review.stars
                length++
            }
        }

        let imagesArray = [];
        for (let image of allImages) {
            image = image.toJSON()
            if(spot.id === image.spotId) {
                imagesArray.push(image.url)
            }
        }

        spot.avgRating = total / length
        spot.previewImages = imagesArray
        if(!spot.avgRating) {
            spot.avgRating = 'Has not been rated yet ;('
        }
        if(!spot.previewImages.length) {
            spot.previewImages = 'No images ;( available'
        }
        result.Spots.push(spot)
    }
    res.status(200).json(result)
});

// gets spot details based on spotId
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    let oneSpot = await Spot.findByPk(spotId)
    if (!oneSpot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    let oneUser = await User.findByPk(oneSpot.ownerId, {
        attributes: {
            exclude: ['username']
        }
    });
    let allReviews = await Review.findAll();
    let allImages = await SpotImage.findByPk(spotId, {
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    });

        oneSpot = oneSpot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(oneSpot.id === review.spotId) {
                total += review.stars
                length++
            };
        };

        let imagesArray = [];
        if (allImages.length > 1) {
            for (let image of allImages) {
                image = image.toJSON()
                imagesArray.push(image)
            };
        } else {
            allImages = allImages.toJSON()
            imagesArray.push(allImages)
        };
        oneSpot.numReviews = length;
        oneSpot.avgStarRating = total / length;
        oneSpot.SpotImages = imagesArray;
        oneSpot.Owner = oneUser;
        if(!oneSpot.avgStarRating) {
            oneSpot.avgStarRating = 'Has not been rated yet ;('
        };
        if(!imagesArray.length) {
            oneSpot.SpotImages = 'No images ;( available'
        };
        if(!oneSpot.numReviews) {
            oneSpot.numReviews = 'No reviews ;('
        };
    
    res.status(200).json(oneSpot);
});

//gets all reviews from spots
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const result = {};
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const spotReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['email', 'username', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'preview', 'reviewId']
                    }
                },
                
        ]
    })
    result.Reviews = (spotReviews)
    res.status(200).json(result)
});

//posts reviews on spots from user
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    const userId = req.user.id
    const findReview = await Review.findOne({
        where: {
            userId: userId,
            spotId: parseInt(spotId)
        }
    });

    if (findReview) {
        res.status(500).json({
            message: "User already has a review for this spot"
        });
    };

    const { review, stars } = req.body;
    const newReview = await Review.create({
        spotId: parseInt(spotId),
        userId: userId,
        review,
        stars
    })

    res.status(201).json(newReview);
});

// posts new images for spots
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    const newImage = await SpotImage.create({
        spotId: spotId,
        url,
        preview
    });

    const image = {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    };

    res.status(201).json(image);
});

// posts/create new spots
router.post('/', requireAuth, validateSpots, async (req, res) => {
    const user = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: user,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201).json(newSpot);
});

// edits spot 
router.put('/:spotId', requireAuth, validateSpots, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price

    await spot.save();

    res.status(200).json(spot)
})

//deletes spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    await spot.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    });
});

module.exports = router;

