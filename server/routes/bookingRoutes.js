const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingPayment,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getUserBookings);
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.put('/:id/payment', authMiddleware, updateBookingPayment);
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;
