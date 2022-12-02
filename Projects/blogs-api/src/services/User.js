const { createToken } = require('../auth/jwtutils');
const models = require('../models');

const postUser = async (user) => {
  const userExist = await models.User.findOne({ where: { email: user.email } });
  if (!userExist) {
    const { password: _, ...userWhitoutPassword } = user;
    await models.User.create(user);
    const token = createToken(userWhitoutPassword);
    return { type: null, token };
  }
  return { type: 'USER_ALREADY_EXISTS', message: 'User already registered' };
};

const getAllUsers = async () => {
  const users = await models.User
  .findAll({ attributes: { exclude: ['password'] } });
  return { type: null, message: users };
};

const getUserByID = async (id) => {
  const user = await models.User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  });
  if (!user) {
    return { type: 'USER_NOT_FOUND', message: 'User does not exist' };
  }
  return { type: null, message: user };
};

const deleteUser = async ({ id }) => {
  await models.User.destroy({
    where: { id },
  });
  return { type: null };
};

module.exports = {
  deleteUser,
  getAllUsers,
  getUserByID,
  postUser,
};