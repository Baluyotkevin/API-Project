const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const router = express.Router();

const validateSpots = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
      .withMessage('State is required'),
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
      .withMessage('Name is required'),
    check('description')
      .exists({ checkFalsy: true })
      .isLength({ min: 30 })
      .withMessage('Description needs a minimum of 30 characters'),
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

const validateDate = [
    check('endDate')
    .custom((value, { req }) => {
        return new Date(value).getTime() >= new Date(req.body.startDate).getTime()
    })
    .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];


// gets all spots from currentUser
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const allSpots = await Spot.findAll({
        where: {
            ownerId: currentUser
        }
    });
    const allReviews = await Review.findAll();
    const result = {Spots: []};
    
    for (let spot of allSpots) {
        const allImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        });
        
        spot = spot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(spot.id === review.spotId) {
                total += review.stars
                length++
            };
        };
        
 
        for (let image of allImages) {
            image = image.toJSON();
            spot.previewImage = image.url;
        };

        if(!spot.previewImage) {
            spot.previewImage = 'No images ;( available'
        };

        spot.avgRating = total / length;
        if(!spot.avgRating) {
            spot.avgRating = 'Has not been rated yet ;('
        };
        result.Spots.push(spot);
    };

    
    

    res.status(200).json(result);
});

// gets all spots
router.get('/' , async (req, res) => {
    const errorObj = {message: "Bad Request", errors: {}}
    const query = {};
    const where = {};
    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    const lat = req.query.lat === undefined ? 90 : parseInt(req.query.lat);
    const lng = req.query.lng === undefined ? 180 : parseInt(req.query.lng);
    const price = req.query.price === undefined ? 999999999 : parseInt(req.query.price);
    if (page < 1) errorObj.errors.page = "Page must be greater than or equal to 1";
    if (size < 1) errorObj.errors.size = "Size must be greater than or equal to 1";
    if (lat < -90 || !Number.isInteger(lat)) errorObj.errors.minLat = "Minimum latitude is invalid";
    if (lat > 90 || !Number.isInteger(lat)) errorObj.errors.maxLat = "Maximum latitude is invalid";
    if (lng < -180 || !Number.isInteger(lng)) errorObj.errors.minLng = "Minimum longitude is invalid";
    if (lng > 180 || !Number.isInteger(lng)) errorObj.errors.maxLng = "Maximum longitude is invalid";
    if (price < 0 || !Number.isInteger(price)) errorObj.errors.maxPrice = "Minimum price must be greater than or equal to 0"
    if (price < 0 || !Number.isInteger(price))errorObj.errors.minPrice = "Minimum price must be greater than or equal to 0"
    if (errorObj.errors.page ||
        errorObj.errors.size ||
        errorObj.errors.minLat ||
        errorObj.errors.maxLat ||
        errorObj.errors.minLng ||
        errorObj.errors.maxLng ||
        errorObj.errors.maxPrice ||
        errorObj.errors.minPrice) return res.status(400).json(errorObj)
        if (page >= 1 && size >= 1 && !(Number.isNaN(size)) && !(Number.isNaN(page))) {
            query.limit = size;
            query.offset = size * (page - 1);
        };

        if (size > 20) size = 20;
        if (page > 10) page = 10;
    const allSpots = await Spot.findAll({
        where: {
            lat: {
                [Op.between]: [-90, lat]
            },
            lng: {
                [Op.between]: [-180, lng]
            },
            price: {
                [Op.between]: [0, price]
            },
            
        },
        ...query
    });
    const allReviews = await Review.findAll()
    const result = {Spots: []};
    result.page = page;
    result.size = size;
    
    
    for (let spot of allSpots) {
        const allImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        });
        spot = spot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(spot.id === review.spotId) {
                total += review.stars;
                length++;
            };
        };

        spot.avgRating = total / length
        if(!spot.avgRating) {
            spot.avgRating = 'Has not been rated yet ;('
        };

        for (let image of allImages) {
            image = image.toJSON();
            spot.previewImage = image.url;
        };

        if(!spot.previewImage) {
            spot.previewImage = 'No images ;( available'
        }
        
        result.Spots.push(spot)
    }
    res.status(200).json(result)
});

// gets spot details based on spotId come back to this one and edit
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    let oneSpot = await Spot.findByPk(spotId)
    if (!oneSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    let oneUser = await User.findByPk(oneSpot.ownerId, {
        attributes: {
            exclude: ['username']
        }
    });
    let allReviews = await Review.findAll();
    let allImages = await SpotImage.findAll( {
        where: {
            spotId: spotId
        },
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
            for (let image of allImages) {
                image = image.toJSON()
                imagesArray.push(image)
            };

        oneSpot.numReviews = length;
        oneSpot.avgStarRating = total / length;
        oneSpot.SpotImages = imagesArray;
        oneSpot.Owner = oneUser;
        if(!oneSpot.avgStarRating) {
            oneSpot.avgStarRating = 'Has not been rated yet ;('
        };
        if(!imagesArray.length) {
            oneSpot.SpotImages = 'No images available ;('
        };
        if(!oneSpot.numReviews) {
            oneSpot.numReviews = 'No reviews ;('
        };
    
    res.status(200).json(oneSpot);
});

//gets all reviews from that spot
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const result = {};
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        return res.status(404).json({
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

// gets all bookings for that spot
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const currentUser = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const result = {};
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    const spotOwner = spot.ownerId
    if (currentUser !== spotOwner) {
        const allBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
                exclude: ['userId', 'id', 'createdAt', 'updatedAt']
            }
        });
        result.Bookings = allBookings;
        return res.status(200).json(result);
    };

    const allBookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        include: {
            model: User,
            attributes: {
                exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
            }
        }
        });
        result.Bookings = allBookings;
        res.status(200).json(result);

});

//posts reviews on spots from user
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    const findReview = await Review.findOne({
        where: {
            userId: userId,
            spotId: parseInt(spotId)
        }
    });

    if (findReview) {
        return res.status(500).json({
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

// adds/creates new images for spots
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const currentUser = req.user.id;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    const spotOwner = spot.ownerId;
    if (currentUser !== spotOwner) {
        return res.status(403).json({
            message: "You are not authorized to post images on this spot >:("
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

    res.status(200).json(image);
});

//post new Bookings
router.post('/:spotId/bookings', requireAuth, validateDate, async (req, res) => {
    const currentUserId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    if(currentUserId === spot.ownerId) {
        return res.status(403).json({
            message: "You are not allowed to book your own spot >:( Unless.."
        });
    };

    let bookingStartDate = new Date(req.body.startDate).getTime()
    let bookingEndDate = new Date(req.body.endDate).getTime()
    const allBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });
    
    const errObject = {message: 'Sorry, this spot is already booked for the specified dates', errors: {}};
    for (let booking of allBookings) {
        booking = booking.toJSON();
        let bookedStartDate = new Date(booking.startDate).getTime();
        let bookedEndDate = new Date(booking.endDate).getTime();
        if (bookingStartDate >= bookedStartDate &&
            bookingStartDate <= bookedEndDate) {
                console.log(bookingEndDate, bookingStartDate)
                errObject.errors.startDate = "Start date conflicts wtih existing booking"
            };

        if (bookingEndDate <= bookedEndDate &&
            bookingEndDate >= bookedStartDate) {
                errObject.errors.endDate = "End date conflicts with an existing booking"
            }
        };

        if (errObject.errors.startDate || errObject.errors.endDate) {
            return res.status(403).json(errObject);
        };

    const newBooking = await Booking.create({
        spotId: parseInt(spotId),
        userId: currentUserId,
        startDate,
        endDate
    });
    res.status(200).json(newBooking);
});

// posts/create new spots
router.post('/', requireAuth, validateSpots, async (req, res) => {
    const currentUser = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: currentUser,
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
    const currentUser = req.user.id;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    
    const spotOwnerUser = spot.ownerId;
    if(currentUser !== spotOwnerUser) {
        return res.status(403).json({
            message: "You are not authorized to edit this spot"
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

    res.status(200).json(spot);
});

//deletes spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const currentUser = req.user.id;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    const spotOwnerUser = spot.ownerId;
    if(currentUser !== spotOwnerUser) {
        return res.status(403).json({
            message: "You are not authorized to edit this spot"
        });
    };

    await spot.destroy();
    res.status(200).json({
        spotId
    });
});

module.exports = router;

