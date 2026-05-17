// const express = require('express');
// const router = express.Router();
// const {
//   getAllPricing,
//   getPricingById,
//   createPricing,
//   updatePricing,
//   deletePricing,
// } = require('../controllers/pricingController');
// const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// router.get('/', getAllPricing);
// router.get('/:id', getPricingById);
// router.post('/', authMiddleware, adminMiddleware, createPricing);
// router.put('/:id', authMiddleware, adminMiddleware, updatePricing);
// router.delete('/:id', authMiddleware, adminMiddleware, deletePricing);

// module.exports = router;
// const express = require("express");
// import { createPricing, getAllPricing } from "../controllers/pricingController.js";
// import { verifyAdmin } from "../middleware/auth.js";

// const router = express.Router();

// // Admin add
// router.post("/", verifyAdmin, createPricing);

// // Public get
// router.get("/", getAllPricing);

// export default router;

const express = require("express");
const router = express.Router();

const pricingController = require("../controllers/pricingController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// Debug (optional)
console.log(pricingController);

// Routes
router.get("/", pricingController.getAllPricing);
router.get("/:id", pricingController.getPricingById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  pricingController.createPricing
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  pricingController.updatePricing
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  pricingController.deletePricing
);

module.exports = router;