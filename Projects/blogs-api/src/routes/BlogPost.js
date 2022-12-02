const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const jwtAuth = require('../auth/validateToken');

const routes = Router();

routes.get('/search', jwtAuth, controller.BlogPost.getPostByTerm);
routes.post('/', jwtAuth, middleware.BlogPost.validatePost, controller.BlogPost.createBlogPost);
routes.put('/:id', jwtAuth, middleware.BlogPost.validateUpdate, controller.BlogPost.updatePost);
routes.delete('/:id', jwtAuth, controller.BlogPost.deletePost);
routes.get('/:id', jwtAuth, controller.BlogPost.getPostsById);
routes.get('/', jwtAuth, controller.BlogPost.getAllPosts);

module.exports = routes;