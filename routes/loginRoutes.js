const express = require('express');
const services = require('../services/loginServices');

const loginRouter = express.Router();

loginRouter.post('/', services.registerUser);

module.exports = {
  loginRouter,
};
