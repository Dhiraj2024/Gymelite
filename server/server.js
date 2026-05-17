require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const pricingRoutes = require('./routes/pricingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pricing', pricingRoutes);


app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
