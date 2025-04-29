const bcrypt = require('bcryptjs');
const { login } = require('../controllers/authController');

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockImplementation((password, hash) => {
    // Return true for password123
    return Promise.resolve(password === 'password123');
  })
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

describe('User Login', () => {
  let res;

  beforeEach(() => {
    res = mockResponse();
    bcrypt.compare.mockClear();
  });

  it('should login successfully with correct credentials', async () => {
    const req = mockRequest({
      email: 'user@example.com',
      password: 'password123'
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Login successful',
        user: expect.objectContaining({
          email: 'user@example.com'
        })
      })
    );
  });
}); 