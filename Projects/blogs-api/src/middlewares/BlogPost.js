const Joi = require('joi');

const validate = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(Joi.number().min(1)).required(),
});

const validatePostUpdate = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const validatePost = (req, res, next) => {
  const { body } = req;
  const { error } = validate.validate(body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const { body } = req;
  const { error } = validatePostUpdate.validate(body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  validatePost,
  validateUpdate,
};