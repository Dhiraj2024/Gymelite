// import mongoose from "mongoose";

// const pricingSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   price: { type: String, required: true }, // "999/year"
//   duration: { type: String }, // yearly / monthly
// }, { timestamps: true });

// export default mongoose.model("Pricing", pricingSchema);

const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  duration: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Pricing", pricingSchema);