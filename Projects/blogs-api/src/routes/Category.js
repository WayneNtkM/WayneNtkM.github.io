const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const jwtAuth = require('../auth/validateToken');

const routes = Router();

routes.post('/', middleware.Category.validateName, jwtAuth, controller.Category.postCategory);
routes.get('/', jwtAuth, controller.Category.getAllCategories);

module.exports = routes;