const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');
const router = express.Router();

router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const reviewImageId = req.params.reviewImageId;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    if (!reviewImage) {
        return res.status(404).json({
                message: "Review Image couldn't be found"
            });
    };
    const review = await Review.findByPk(reviewImage.reviewId);
    const reviewOwner = review.userId;
    if (currentUser !== reviewOwner) {
        return res.status(401).json({
            message: "You are not authorized to delete this review image >:("
        });
    };

    await reviewImage.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    });
});







module.exports = router;