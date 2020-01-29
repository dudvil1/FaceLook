var express = require('express');
var registrationController = require('../controllers/registrationController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post("/login", registrationController.login);