const Review = require('../models/Review');
const Program = require('../models/Program');

const addReview = async (req, res) => {
  try {
    const { programId, rating, comment } = req.body;
    
    const review = new Review({
      user: req.user.id,
      program: programId,
      rating,
      comment,
    });

    await review.save();
    
    const program = await Program.findById(programId);
    const totalRating = await Review.aggregate([
      { $match: { program: program._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);
    
    program.rating = totalRating[0]?.avgRating || 0;
    await program.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByProgram = async (req, res) => {
  try {
    const reviews = await Review.find({ program: req.params.programId }).populate('user');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviewsByProgram, deleteReview };
