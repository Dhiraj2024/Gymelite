const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.post('/', authMiddleware, adminMiddleware, createTrainer);
router.put('/:id', authMiddleware, adminMiddleware, updateTrainer);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTrainer);

module.exports = router;
