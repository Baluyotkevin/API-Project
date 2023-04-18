const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                as: 'avgRating',
                attributes: ['stars']
            },
            {
                model: SpotImage,
                as: 'previewImage',
                attributes: ['preview', 'url']
            }
        ]
    })
    
        let spotsList = [];
        allSpots.forEach(spot => {
            spotsList.push(spot.toJSON())
        })

        spotsList.forEach(spot => {
            let total = 0;
            let length = spot.avgRating.length
            spot.avgRating.forEach(rating => {
                total += rating.stars
            })
            spot.avgRating = total/length
            if(!spot.avgRating) {
                spot.avgRating = 'Has not been rated yet!'
            }
        })



        spotsList.forEach(spot => {
            let imagesArray = [];
            spot.previewImage.forEach(image => {
                if(image.preview === true) {
                    image.preview = image.url
                    imagesArray.push(image.preview)
                }
            })
                spot.previewImage = imagesArray
                if(!spot.previewImage.length) {
                    spot.previewImage = 'No images found ;('
                }
        })

    res.status(200).json({
        "Spots": spotsList
    })
});




module.exports = router;

