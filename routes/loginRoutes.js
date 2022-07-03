const express = require('express');
const services = require('../services/loginServices');

const loginRouter = express.Router();

loginRouter.post('/', services.login);

module.exports = {
  loginRouter,
};
