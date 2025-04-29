// JWT Configuration
require('dotenv').config(); // Load .env variables

module.exports = {
  secret: process.env.JWT_SECRET || 'fallback-ecolink-secret-key-!@#$', // Use env variable or fallback
  expiresIn: '1d', // Token expires in 1 day
  cookieOptions: {
    httpOnly: true, // Prevent client-side JS access
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'Strict', // Protect against CSRF
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (matches expiresIn)
  }
}; 