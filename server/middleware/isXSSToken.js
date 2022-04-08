import bcrypt from 'bcryptjs';

export const isXSSToken = async (req, res, next) => {
  const xssToken = req.cookies['XSS_TOKEN'];

  if (!xssToken) {
    return res.status(403).json('Fail Auth XSS_TOKEN');
  }

  const validateXSSToken = bcrypt.compare(xssToken, process.env.XSS_TOKEN);

  if (!validateXSSToken) {
    return res.status(403).json('Fail XSS_TOKEN Check!');
  } else {
    next();
  }
};
