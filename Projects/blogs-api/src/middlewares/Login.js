const Joi = require('joi');

const validate = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

const validateLogin = (req, res, next) => {
  const { body } = req;
  const { error } = validate.validate(body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  validateLogin,
};