const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

describe('JWT Token Management', () => {
  const mockUser = {
    _id: '60f1f8a0b3f3e8a4c4e8b8a0',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  };

  it('should generate and validate JWT token with correct payload and expiration', () => {
    const token = jwt.sign(
      {
        id: mockUser._id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    // Verify the token
    const decoded = jwt.verify(token, jwtConfig.secret);
    expect(decoded).toMatchObject({
      id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role
    });
    expect(decoded.exp).toBeDefined();
    expect(typeof decoded.exp).toBe('number');
  });

  it('should handle JWT token verification errors', () => {
    const token = jwt.sign(
      {
        id: mockUser._id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    expect(() => {
      jwt.verify(token, 'wrong-secret');
    }).toThrow();
  });
}); 