const express = require('express')

const {
    postBooking,
    getBookings

} = require('../controllers/booking')

const router = express.Router();

router.post('/booking', postBooking)
router.get('/bookings',getBookings)

module.exports=router;