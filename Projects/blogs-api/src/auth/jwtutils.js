const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = async (authorization) => {
  try {
    const { data } = jwt.verify(authorization, secret);
    const user = await models.User.findOne({ where: { email: data.email } });
    return { data, user };
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = { createToken, verifyToken };