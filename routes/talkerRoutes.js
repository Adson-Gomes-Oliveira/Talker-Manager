const express = require('express');
const services = require('../services/talkerServices');
const validations = require('../validations/talkerValidations');

const talkerRouter = express.Router();

talkerRouter.get('/', services.getAll);

talkerRouter.get('/search',
validations.verifyToken, 
services.getSearch);

talkerRouter.get('/:id', services.getById);

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
