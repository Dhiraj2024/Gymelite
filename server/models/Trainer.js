const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  speciality: { type: String, required: true },
  program: { type: String },
  bio: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Trainer", trainerSchema);