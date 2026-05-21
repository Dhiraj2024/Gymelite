const mongoose = require('mongoose');
const User = require('./models/User');

require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gyme');
    
    const result = await User.findOneAndUpdate(
      { email: 'jane@example.com' },
      { isAdmin: true }, 
      { new: true }
    );
    //Password456   AAAAA9999A
    console.log('User updated to admin:', result);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
