var express = require('express');
var registrationController = require('../controllers/registrationController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post("/register", registrationController.register);
api.post("/login", registrationController.login);
api.patch("/verifyAccount", registrationController.verifyAccount);
api.patch("/forgotPassword", registrationController.forgotPassword);

module.exports = api;


