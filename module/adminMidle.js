import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(202).json({ Logout: "OUT" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "kanna_stawro_founders_withhh_1931_psycho_keeerthiii_01_"
    );

    req.username = decoded.username;

    if (req.username === decoded.username) {
      next();
    } else {
      return res.status(202).json({ Logout: "OUT" });
    }
  } catch (err) {
    return res.status(202).json({ Logout: "OUT" });
  }
};

export default adminMiddleware;
