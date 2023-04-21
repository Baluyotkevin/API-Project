const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
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
        return res.status(403).json({
            message: "You are not authorized to delete this image >:("
        });
    };

    await spotImage.destroy();

    res.status(200).json({
        message: "Successfully deleted"
    });
});












module.exports = router;