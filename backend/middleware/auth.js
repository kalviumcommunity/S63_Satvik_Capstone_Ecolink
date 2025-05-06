/**
 * Re-export authentication middleware from authMiddleware.js
 * This file is maintained for backward compatibility
 */

const { verifyToken, authorize } = require('./authMiddleware');

module.exports = {
  verifyToken,
  authorize
};