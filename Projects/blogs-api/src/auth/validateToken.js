const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const { data } = jwt.verify(token, secret);
    const user = await models.User.findOne({ where: { email: data.email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User does not exist' });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};