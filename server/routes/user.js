const express = require("express");
const usersController = require("../controllers/usersController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/searchUsers/:data", md_auth.ensureAuth, usersController.searchUsers);

module.exports = api;