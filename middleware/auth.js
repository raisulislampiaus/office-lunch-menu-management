// middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.secret, async (err, user) => {
    if (err) return res.sendStatus(403);
    
    req.user = await db.User.findByPk(user.id);
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
};

module.exports = { authenticateToken, isAdmin };
