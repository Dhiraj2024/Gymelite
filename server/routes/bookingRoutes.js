const express = require('express');
const router = express.Router();
const {
  createBooking,
  createPaymentOrder,
  verifyPayment,
  getUserBookings,
  getAllBookings,
  updateBookingPayment,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Specific routes FIRST (payment routes)
router.post('/payment/order', authMiddleware, createPaymentOrder);
router.post('/payment/verify', authMiddleware, verifyPayment);

// General routes
router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getUserBookings);
router.put('/:id/payment', authMiddleware, updateBookingPayment);
router.delete('/:id', authMiddleware, cancelBooking);

// Admin route - most general, last
router.get('/', authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
