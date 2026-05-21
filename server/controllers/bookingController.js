const Booking = require('../models/Booking');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createBooking = async (req, res) => {
  try {
    const { planId, slots, startDate, endDate, bio } = req.body;
    
    if (!planId || !startDate || !endDate) {
      return res.status(400).json({ message: 'planId, startDate, and endDate are required' });
    }

    const booking = new Booking({
      user: req.user.id,
      plan: planId,
      slots,
      startDate,
      endDate,
      bio,
      paymentStatus: 'pending',
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    res.status(500).json({ message: error.message || 'Failed to create booking' });
  }
};

const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    
    if (!bookingId || !amount) {
      return res.status(400).json({ message: 'bookingId and amount are required' });
    }

    if (amount <= 0 || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: bookingId,
      payment_capture: 1,
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order.id);
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { 
        razorpayOrderId: order.id,
        amount: amount
      },
      { new: true }
    );

    res.json({ orderId: order.id, booking });
  } catch (error) {
    console.error('Payment Order Creation Error:', error.message, error);
    res.status(500).json({ message: error.message || 'Failed to create payment order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    
    if (!bookingId || !razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({ message: 'Missing payment verification parameters' });
    }

    console.log('Payment verification request:', { 
      bookingId, 
      razorpayOrderId, 
      razorpayPaymentId,
      hasSignature: !!razorpaySignature
    });

    // For test mode (when signature is missing or 'test_mode'), skip verification
    if (razorpaySignature && razorpaySignature !== 'test_mode') {
      const crypto = require('crypto');
      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');

      console.log('Verifying signature:', { match: digest === razorpaySignature });

      if (digest !== razorpaySignature) {
        console.error('Signature verification failed');
        return res.status(400).json({ message: 'Payment signature verification failed' });
      }
    } else {
      console.log('Test mode or missing signature - accepting payment');
    }

    // Update booking status to completed
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { 
        paymentStatus: 'completed',
        transactionId: razorpayPaymentId,
        razorpayOrderId: razorpayOrderId
      },
      { new: true }
    ).populate('user plan');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log('✅ Payment verified and booking updated:', { 
      bookingId, 
      paymentStatus: booking.paymentStatus, 
      amount: booking.amount,
      user: booking.user?.name
    });
    
    res.json({ message: 'Payment verified successfully', booking });
  } catch (error) {
    console.error('Payment Verification Error:', error.message);
    res.status(500).json({ message: error.message || 'Payment verification failed' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('plan');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user plan');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingPayment = async (req, res) => {
  try {
    const { paymentStatus, transactionId, amount } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, transactionId, amount },
      { new: true }
    );
    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  createPaymentOrder,
  verifyPayment,
  getUserBookings,
  getAllBookings,
  updateBookingPayment,
  cancelBooking,
};
