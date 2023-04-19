const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// gets all spots from currentUser
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    console.log(userId)
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
        // console.log(spot.id)
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
        // console.log(spot.id)
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
// gets spot based on spotId
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    let oneSpot = await Spot.findByPk(spotId)
    let oneUser = await User.findByPk(oneSpot.ownerId, {
        attributes: {
            exclude: ['username']
        }
    });
    let allReviews = await Review.findAll()
    let allImages = await SpotImage.findByPk(spotId, {
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    })

        oneSpot = oneSpot.toJSON()
        let total = 0;
        let length = 0;
        for (let review of allReviews) {
            review = review.toJSON()
            if(oneSpot.id === review.spotId) {
                total += review.stars
                length++
            }
        }

        let imagesArray = [];
        if (allImages.length > 1) {
            for (let image of allImages) {
                image = image.toJSON()
                imagesArray.push(image)
            }
        } else {
            allImages = allImages.toJSON()
            imagesArray.push(allImages)
        }
        oneSpot.numReviews = length
        oneSpot.avgStarRating = total / length
        oneSpot.SpotImages = imagesArray
        oneSpot.Owner = oneUser
        if(!oneSpot.avgStarRating) {
            oneSpot.avgStarRating = 'Has not been rated yet ;('
        }
        if(!imagesArray.length) {
            oneSpot.SpotImages = 'No images ;( available'
        }
        if(!oneSpot.numReviews) {
            oneSpot.numReviews = 'No reviews ;('
        }
    
    res.status(200).json(oneSpot)
});


module.exports = router;

