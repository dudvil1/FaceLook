var express = require('express');
var api = express.Router();
var DefaultController = require('../controllers/defaultController');

api.get('/', DefaultController.help);
api.get('/status', DefaultController.status);

module.exports = api;