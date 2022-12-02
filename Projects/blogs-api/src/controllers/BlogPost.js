const service = require('../services');

const createBlogPost = async (req, res) => {
  try {
    const newPost = req.body;
    const { authorization } = req.headers;
    const { type, message } = await service.BlogPost
    .createBlogPost(newPost, authorization);
    if (type) {
      return res.status(400).json({ message });
    }
    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const { message } = await service.BlogPost.getAllPosts();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await service.BlogPost.getPostsById(id);
    if (type) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { user } = req;
    const { type, message } = await service.BlogPost.updatePost(body, id, user);
    if (type) {
      return res.status(401).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { status, type, message } = await service.BlogPost.deletePost(id, user);
    if (type) {
      return res.status(status).json({ message });
    }
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getPostByTerm = async (req, res) => {
  try {
    const { q } = req.query;
    const { message } = await service.BlogPost.getPostByTerm(q);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  createBlogPost,
  deletePost,
  getAllPosts,
  getPostsById,
  getPostByTerm,
  updatePost,
};