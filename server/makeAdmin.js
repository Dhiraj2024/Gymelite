
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "admin@gyme.com";
    const adminPassword = "GymAdmin@2026";

    // Check whether admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      console.log("Email:", adminEmail);
      return;
    }

    // Create a separate admin account
    const admin = new User({
      name: "Gym Admin",
      email: adminEmail,
      password: adminPassword,
      isAdmin: true,
    });

    // User model automatically hashes the password
    await admin.save();

    console.log("New admin account created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("isAdmin:", admin.isAdmin);
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
