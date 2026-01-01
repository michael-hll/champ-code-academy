import { Router } from 'express';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Mock validation - accept any email/password for demo
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // For demo: accept tutor@champcode.com / password123
  // In production, validate against DB
  const isValid = email === 'tutor@champcode.com' && password === 'password123';

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Mock user data
  const user = {
    id: 'user-001',
    name: 'Sarah Tan',
    email: 'tutor@champcode.com',
    avatar: null,
  };

  // Mock tokens (in production, use JWT signing)
  const accessToken = `mock-access-token-${Date.now()}`;
  const refreshToken = `mock-refresh-token-${Date.now()}`;

  res.json({
    user,
    accessToken,
    refreshToken,
  });
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  // Mock token refresh
  const newAccessToken = `mock-access-token-${Date.now()}`;

  res.json({
    accessToken: newAccessToken,
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // In production, invalidate tokens on server side
  res.json({ message: 'Logged out successfully' });
});

export default router;
