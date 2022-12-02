const service = require('../services');

const login = async (req, res) => {
  try {
    const user = req.body;
    const { token, type, message } = await service.Login.login(user);
    if (type) {
      return res.status(400).json({ message });
    }
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  login,
};