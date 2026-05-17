// const Pricing = require('../models/Pricing');

// const getAllPricing = async (req, res) => {
//   try {
//     const pricing = await Pricing.find({ isActive: true });
//     res.json(pricing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getPricingById = async (req, res) => {
//   try {
//     const pricing = await Pricing.findById(req.params.id);
//     if (!pricing) return res.status(404).json({ message: 'Pricing not found' });
//     res.json(pricing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createPricing = async (req, res) => {
//   try {
//     const pricing = new Pricing(req.body);
//     await pricing.save();
//     res.status(201).json({ message: 'Pricing created successfully', pricing });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updatePricing = async (req, res) => {
//   try {
//     const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ message: 'Pricing updated successfully', pricing });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deletePricing = async (req, res) => {
//   try {
//     await Pricing.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Pricing deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getAllPricing,
//   getPricingById,
//   createPricing,
//   updatePricing,
//   deletePricing,
// };
// const Pricing = require("../models/Pricing");

// // CREATE (Admin only)
// export const createPricing = async (req, res) => {
//   try {
//     const pricing = new Pricing(req.body);
//     const saved = await pricing.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // GET ALL (Public)
// export const getAllPricing = async (req, res) => {
//   try {
//     const pricing = await Pricing.find();
//     res.status(200).json(pricing);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
const Pricing = require("../models/Pricing");

// Get all pricing
const getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find({ isActive: true });
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pricing by ID
const getPricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);

    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create pricing
const createPricing = async (req, res) => {
  try {
    const pricing = new Pricing(req.body);
    await pricing.save();

    res.status(201).json({
      message: "Pricing created successfully",
      pricing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pricing
const updatePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    res.json({
      message: "Pricing updated successfully",
      pricing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete pricing
const deletePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndDelete(req.params.id);

    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    res.json({ message: "Pricing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT (IMPORTANT)
module.exports = {
  getAllPricing,
  getPricingById,
  createPricing,
  updatePricing,
  deletePricing,
};