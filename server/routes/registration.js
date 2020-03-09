var express = require('express');
var registrationController = require('../controllers/registrationController');
var api = express.Router();

api.post("/register", registrationController.register);
api.post("/login", registrationController.login);
api.patch("/verifyAccount", registrationController.verifyAccount);
api.patch("/forgetPassword", registrationController.forgetPassword);
api.patch("/getResetCodePassword",registrationController.getResetCodePassword)

module.exports = api;


