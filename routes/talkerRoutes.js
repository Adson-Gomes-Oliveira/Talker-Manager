const express = require('express');
const services = require('../services/talkerServices');

const talkerRouter = express.Router();

talkerRouter.get('/', services.getAll);
talkerRouter.get('/:id', services.getById);
talkerRouter.get('/search');
talkerRouter.post('/', services.addPerson);
talkerRouter.put('/:id');
talkerRouter.delete('/:id');

module.exports = {
  talkerRouter,
};
