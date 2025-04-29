const { getCurrentUser, logout } = require('../controllers/authController');

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

// Mock request object
const mockRequest = (body = {}, user = null) => {
  return { body, user };
};

describe('User Profile and Logout', () => {
  let res;

  beforeEach(() => {
    res = mockResponse();
  });

  it('should handle user profile retrieval and logout', async () => {
    // Test get current user
    const profileReq = mockRequest({}, {
      id: '60f1f8a0b3f3e8a4c4e8b8a0'
    });

    await getCurrentUser(profileReq, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          email: 'admin@example.com'
        })
      })
    );

    // Test logout
    const logoutReq = mockRequest();
    await logout(logoutReq, res);
    expect(res.clearCookie).toHaveBeenCalledWith('token', expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Logout successful'
      })
    );
  });
}); 