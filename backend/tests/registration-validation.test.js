const { register } = require('../controllers/authController');

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock request object
const mockRequest = (body = {}) => {
  return { body };
};

describe('Registration Validation', () => {
  let res;

  beforeEach(() => {
    res = mockResponse();
  });

  it('should return 400 if required fields are missing', async () => {
    const req = mockRequest({
      name: 'Test User',
      // email missing
      password: 'password123'
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Name, email, and password are required'
      })
    );
  });
}); 