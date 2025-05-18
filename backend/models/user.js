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

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered');

  // Only hash if the password is new or modified
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hashing');
    return next();
  }

  // If the password is already a bcrypt hash, skip hashing
  if (this.password && this.password.startsWith('$2a$')) {
    console.log('Password already hashed, skipping hashing');
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

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    console.log('Comparing passwords...');
    console.log('Entered:', enteredPassword);
    console.log('Stored:', this.password);
    const isMatch = await bcryptjs.compare(enteredPassword, this.password);
    console.log(`Password comparison result: ${isMatch}`);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
