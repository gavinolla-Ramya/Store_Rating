const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ message: 'No token provided!' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: 'Unauthorized!' });

    req.user = decoded; // contains userId and role
    next();
  });
};

// Role check middleware
const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') next();
  else return res.status(403).json({ message: 'Require Admin Role!' });
};

const isStoreOwner = (req, res, next) => {
  if (req.user.role === 'owner') next();
  else return res.status(403).json({ message: 'Require Store Owner Role!' });
};

const isUser = (req, res, next) => {
  if (req.user.role === 'user') next();
  else return res.status(403).json({ message: 'Require User Role!' });
};

module.exports = {
  verifyToken,
  isAdmin,
  isStoreOwner,
  isUser
};
