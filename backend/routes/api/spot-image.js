const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// deletes spotImages
router.delete('/:spotImageId', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const spotImageId = req.params.spotImageId;
    const spotImage = await SpotImage.findByPk(spotImageId);
    if(!spotImage) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };
    const spot = await Spot.findByPk(spotImage.spotId);
    const spotImageOwner = spot.ownerId;
    if (currentUser !== spotImageOwner) {
        return res.status(401).json({
            message: "You are not authorized to delete this image >:("
        });
    };

    await spotImage.destroy();

    res.status(200).json({
        message: "Successfully deleted"
    });
});












module.exports = router;