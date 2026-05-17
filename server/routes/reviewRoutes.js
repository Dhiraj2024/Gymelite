const express = require('express');
const router = express.Router();
const { addReview, getReviewsByProgram, deleteReview } = require('../controllers/reviewController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, addReview);
router.get('/program/:programId', getReviewsByProgram);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

module.exports = router;
