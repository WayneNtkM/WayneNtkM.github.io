const { Op } = require('sequelize');
const { verifyToken } = require('../auth/jwtutils');
const models = require('../models');

const fetchPostByID = async (id) => {
  const post = await models.BlogPost.findOne({
    where: { id },
    include: [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
    { model: models.Category, as: 'categories' }],
  });
  return post;
};

const fetchAllPosts = async () => {
  const posts = await models.BlogPost.findAll({
    include: [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
    { model: models.Category, as: 'categories' }],
  });
  return posts;
};

const createBlogPost = async ({ title, content, categoryIds }, token) => {
  const categories = await models.Category
  .findAll({ where: { id: { [Op.in]: categoryIds } } });
  const categoriesExist = categoryIds
  .map((e) => categories.some(({ id }) => id === e)).every((e) => e === true);
  if (categoriesExist) {
    const { user: { id } } = await verifyToken(token);
    const { dataValues } = await models.BlogPost
    .create({ title, content, userId: id });
    const postCategory = categoryIds.map((e) => ({ categoryId: e, postId: dataValues.id }));
    await models.PostCategory.bulkCreate(postCategory);
    return { type: null, message: dataValues };
  }
  return { type: 'CATEGORY_ID_NOT_FOUND', message: 'one or more "categoryIds" not found' };
};

const getAllPosts = async () => {
  const posts = await fetchAllPosts();
  return {
    type: null,
    message: posts,
  };
};

const getPostsById = async (id) => {
  const post = await fetchPostByID(id);
  if (!post) {
    return { type: 'BLOG_POST_NOT_FOUND', message: 'Post does not exist' };
  }
  return {
    type: null,
    message: post,
  };
};

const updatePost = async ({ title, content }, id, user) => {
  const [data] = await models.BlogPost.update({
    title, content },
    { where: { id, userId: user.id } });
    if (data) {
      const newPost = await fetchPostByID(id);
      return { type: null, message: newPost };
    }
  return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
};

const deletePost = async (id, user) => {
  const post = await fetchPostByID(id);
  if (!post) {
    return { status: 404, type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  }
  const authorizhed = await models.BlogPost.destroy(
    { where: { [Op.and]: { id, userId: user.id } } },
  );
  if (authorizhed) {
    return { type: null };
  }
  return { status: 401, type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
};

const getPostByTerm = async (term) => {
  // if (!term) {
  //   const posts = 
  //   return; 
  // }
  const post = await models.BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${term}%` },
        content: { [Op.like]: `%${term}%` },
      },
    },
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories' },
    ],
  });
  return { type: null, message: post };
};

module.exports = {
  createBlogPost,
  deletePost,
  getAllPosts,
  getPostsById,
  getPostByTerm,
  updatePost,
};