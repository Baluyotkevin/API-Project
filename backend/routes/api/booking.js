const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateDate = [
    check('endDate')
    .custom((value, { req }) => {
        return new Date(value).getTime() >= new Date(req.body.startDate).getTime()
    })
    .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];


// gets all bookings for currentUser
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    const result = {Bookings: []};
    const allBookings = await Booking.findAll({
        where: {
            userId: currentUserId
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    });
    
    for (let booking of allBookings) {
        booking = booking.toJSON();
        const allImages = await SpotImage.findAll({
            where: {
                spotId: booking.spotId
            },
            attributes: {
                exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt']
            }
        });
        booking.Spot.previewImage = allImages;
        const bookingsObj = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: booking.Spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
        result.Bookings.push(bookingsObj);
    };

    res.status(200).json(result);
});

//edits booking
router.put('/:bookingId', requireAuth, validateDate, async (req, res) => {
    const currentUser = req.user.id
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId)
    const { startDate, endDate } = req.body
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    };

    const bookingOwner = booking.userId;
    if (currentUser !== bookingOwner) {
        return res.status(403).json({
            message: "You are not authorized to edit this booking >:("
        });
    };

    const inputStartDate = new Date(startDate).getTime();
    const inputEndDate = new Date(endDate).getTime();
    const currentDate = new Date().getTime();
    if(currentDate > inputEndDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        });
    };

    const allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });

    const errObject = {message: 'Sorry, this spot is already booked for the specified dates', errors: {}};
    for (let booking of allBookings) {
        booking = booking.toJSON();
        let bookedStartDate = new Date(booking.startDate).getTime();
        let bookedEndDate = new Date(booking.endDate).getTime();
        if (inputStartDate >= bookedStartDate &&
            inputStartDate <= bookedEndDate) {
                errObject.errors.startDate = "Start date conflicts wtih existing booking"
            };

        if (inputEndDate <= bookedEndDate &&
            inputEndDate >= bookedStartDate) {
                errObject.errors.endDate = "End date conflicts with an existing booking"
            }
        };

        if (errObject.errors.startDate || errObject.errors.endDate) {
            return res.status(403).json(errObject);
        };

    booking.startDate = startDate
    booking.endDate = endDate

    await booking.save()

    res.status(200).json(booking)

});

// deletes booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const currentUser = req.user.id;
    const booking = await Booking.findByPk(bookingId);
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    };
    const bookingOwner = booking.userId;
    if(currentUser !== bookingOwner) {
        return res.status(403).json({
            message: "You are not authorized to delete this booking >:("
        });
    };

    const startDate = new Date(booking.startDate).getTime();
    const currentDate = new Date().getTime();

    if(startDate <= currentDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        });
    };

    await booking.destroy()
    res.status(200).json({
        message: "Succesfully deleted"
    });

});

module.exports = router;