const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ngo', 'volunteer'],
    default: 'volunteer',
  },
  joinedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  points: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

//  Hash password before saving
userSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered');
  
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hashing');
    return next();
  }
  
  try {
    console.log('Hashing password...');
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    next(err);
  }
});

//  Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    console.log('Comparing passwords...');
    const isMatch = await bcryptjs.compare(enteredPassword, this.password);
    console.log(`Password comparison result: ${isMatch}`);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};


module.exports = mongoose.model('User', userSchema);
