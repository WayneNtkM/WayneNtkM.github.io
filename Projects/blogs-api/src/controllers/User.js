const service = require('../services');

const postUser = async (req, res) => {
  try {
    const { body } = req;
    const { type, message, token } = await service.User.postUser(body);
    if (type) {
      return res.status(409).json({ message });
    }
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500);
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const { message } = await service.User.getAllUsers();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await service.User.getUserByID(id);
    if (type) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await service.User.deleteUser(user);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  deleteUser,
  getAllUsers,
  getUserByID,
  postUser,
};