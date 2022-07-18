const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // check if headers exists and separates token from bearer
  const token = authHeader && authHeader.split(" ")[1];

  // check if header has a token
  if (!token) {
    return res.status(404).json({ errors: ["Acesso negado!"] });
  }

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findByPk(verified.id, {
      attributes: { exclude: ["password"] },
    });

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = authGuard;
