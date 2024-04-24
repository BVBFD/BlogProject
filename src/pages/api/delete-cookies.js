export default function handler(req, res) {
  res.setHeader('Set-Cookie', [`WebsiteToken=deleted; Max-Age=0`, `AnotherCookieName=deleted; Max-Age=0`]);
  res.status(200).json({ message: 'Cookies deleted successfully' });
}
