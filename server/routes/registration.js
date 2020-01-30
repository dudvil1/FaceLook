var express = require('express');
var registrationController = require('../controllers/registrationController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post("/register", registrationController.login);
api.post("/login", registrationController.login);
api.patch("/verifyAccount", registrationController.login);
api.patch("/forgotPassword", registrationController.login);




