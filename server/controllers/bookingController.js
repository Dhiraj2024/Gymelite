const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { planId, slots, startDate, endDate } = req.body;
    
    const booking = new Booking({
      user: req.user.id,
      plan: planId,
      slots,
      startDate,
      endDate,
      paymentStatus: 'pending',
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getUserBookings,
  getAllBookings,
  updateBookingPayment,
  cancelBooking,
};
