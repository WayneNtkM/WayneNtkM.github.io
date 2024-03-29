const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', routes.Login);
app.use('/user', routes.User);
app.use('/categories', routes.Category);
app.use('/post', routes.BlogPost);

module.exports = app;