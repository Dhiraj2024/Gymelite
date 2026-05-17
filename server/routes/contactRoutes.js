const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', authMiddleware, adminMiddleware, getAllContacts);
router.get('/:id', authMiddleware, adminMiddleware, getContactById);
router.delete('/:id', authMiddleware, adminMiddleware, deleteContact);

module.exports = router;
