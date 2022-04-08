import bcrypt from 'bcryptjs';

export const isCSRFToken = async (req, res, next) => {
  const csrfToken = req.get('CSRF_TOKEN');

  if (!csrfToken) {
    return res.status(403).json('Fail Auth CSRF_TOKEN');
  }

  const validateCSRFToken = bcrypt.compare(csrfToken, process.env.CSRF_TOKEN);

  if (!validateCSRFToken) {
    return res.status(403).json('Fail CSRF_TOKEN Check!');
  } else {
    next();
  }
};
