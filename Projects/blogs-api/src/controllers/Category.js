const service = require('../services');

const postCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    const { message } = await service.Category.postCategory(newCategory);
    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const { message } = await service.Category.getAllCategories();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  getAllCategories,
  postCategory,
};