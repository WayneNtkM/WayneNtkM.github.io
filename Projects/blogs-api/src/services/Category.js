const models = require('../models');

const postCategory = async (newCategory) => {
  const category = await models.Category.create(newCategory);
  return {
    type: null,
    message: category,
  };
};

const getAllCategories = async () => {
  const categories = await models.Category.findAll();
  return {
    type: null,
    message: categories,
  };
};

module.exports = {
  postCategory,
  getAllCategories,
};