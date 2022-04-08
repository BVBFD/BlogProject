import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOWMS,
  max: process.env.RATE_LIMIT_MAX,
  keyGenerator: (req, res) => `${process.env.RATE_LIMIT_KEYGEN}`,
});
