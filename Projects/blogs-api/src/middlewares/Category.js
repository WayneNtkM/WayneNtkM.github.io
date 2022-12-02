const Joi = require('joi');

const validate = Joi.object({
  name: Joi.string().min(1).required(),
});

const validateName = (req, res, next) => {
  const { body } = req;
  const { error } = validate.validate(body);
  if (error) {
    return res.status(400).json({ message: '"name" is required' });
  }
  return next();
};

module.exports = {
  validateName,
};