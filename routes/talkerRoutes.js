const express = require('express');
const services = require('../services/talkerServices');
const validations = require('../validations/talkerValidations');

const talkerRouter = express.Router();

talkerRouter.get('/', services.getAll);
talkerRouter.get('/:id', services.getById);
talkerRouter.get('/search');

talkerRouter.post('/',
validations.verifyToken,
validations.verifyNewPersonData,
validations.verifyWatchedTalk,
validations.verifyRateTalk,
services.addPerson);

talkerRouter.put('/:id',
validations.verifyToken,
validations.verifyNewPersonData,
validations.verifyWatchedTalk,
validations.verifyRateTalk,
services.editPerson);

talkerRouter.delete('/:id',
validations.verifyToken, 
services.deletePerson);

module.exports = {
  talkerRouter,
};
