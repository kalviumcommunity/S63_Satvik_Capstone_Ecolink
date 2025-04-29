const bcrypt = require('bcryptjs');
const { register } = require('../controllers/authController');

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword')
}));

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

// Mock request object
const mockRequest = (body = {}) => {
  return { body };
};

describe('User Registration', () => {
  let res;

  beforeEach(() => {
    res = mockResponse();
  });

  it('should register a new user successfully', async () => {
    const req = mockRequest({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Registration successful',
        user: expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com'
        })
      })
    );
  });
}); 