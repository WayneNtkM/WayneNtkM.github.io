const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const jwtAuth = require('../auth/validateToken');

const routes = Router();

routes.post('/', middleware.User.validateUser, controller.User.postUser);
routes.get('/:id', jwtAuth, controller.User.getUserByID);
routes.delete('/me', jwtAuth, controller.User.deleteUser);
routes.get('/', jwtAuth, controller.User.getAllUsers);

module.exports = routes;