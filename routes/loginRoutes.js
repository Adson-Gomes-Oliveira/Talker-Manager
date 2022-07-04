const express = require('express');
const services = require('../services/loginServices');
const validations = require('../validations/loginValidations');

const loginRouter = express.Router();

loginRouter.post('/',
validations.validateLogin,
services.login);

module.exports = {
  loginRouter,
};
