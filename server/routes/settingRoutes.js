const express = require('express');
const router = express.Router();
const { getWhatsappNumber, updateWhatsappNumber, getAddress, updateAddress } = require('../controllers/settingController');
const { authMiddleware } = require('../middleware/auth'); 

// ????? ?????????
router.get('/whatsapp', getWhatsappNumber);
router.put('/whatsapp', authMiddleware, updateWhatsappNumber);

router.get('/address', getAddress);
router.put('/address', authMiddleware, updateAddress);

module.exports = router;
