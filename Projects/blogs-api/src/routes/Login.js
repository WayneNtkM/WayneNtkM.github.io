const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const routes = Router();

routes.post('/', middleware.Login.validateLogin, controller.Login.login);

module.exports = routes;