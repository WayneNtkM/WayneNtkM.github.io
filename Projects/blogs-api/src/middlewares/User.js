const Joi = require('joi');

const validate = Joi.object({
  displayName: Joi.string().required().label('displayName'),
  email: Joi.string().required().label('email'),
  password: Joi.string().required().label('password'),
}).messages({
  'any.required': '"label" is required',
});

const validEmail = (email) => {
  const regex = /[a-zA-z1-9]+@[a-z]+.[a-z]+/gm;
  return regex.test(email);
};

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = validate.validate({ displayName, email, password });
  if (error) return res.status(400).json({ message: error.message });
  const emailValidated = validEmail(email);
  if (displayName.length < 8) {
 return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' }); 
}
  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }
  if (!emailValidated) {
    return res.status(400)
    .json({ message: '"email" must be a valid email' });
  }
  return next();
};

module.exports = {
  validateUser,
};