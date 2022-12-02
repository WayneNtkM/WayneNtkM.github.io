const { createToken } = require('../auth/jwtutils');
const models = require('../models');

const login = async (user) => {
  const { email, password } = user;
  const isUserValid = await models.User.findOne({
    where: { email, password },
  });
  if (!isUserValid) {
    return { type: 'INVALID_FILDS', message: 'Invalid fields' };
  }
  const token = createToken({ email });
  console.log(token);
  return {
    type: null,
    token,
  };
};

module.exports = {
  login,
};