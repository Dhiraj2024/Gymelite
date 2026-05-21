const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['Weight Training', 'Cardio Training', 'Personal Training', 'Yoga', 'Zumba', 'Wrestling', 'Pullups', 'Weightlifting', 'Armwrestling','other'],
  },
  image: String,
  duration: String,
  difficulty: String,
  price: Number,
  likes: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Program', ProgramSchema);
