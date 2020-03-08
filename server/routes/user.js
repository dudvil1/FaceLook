const express = require("express");
const usersController = require("../controllers/usersController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/searchUsers/:data", md_auth.ensureAuth, usersController.searchUsers);
api.post("/addFriend", md_auth.ensureAuth, usersController.addFriend);
api.post("/updateFollowFriend", md_auth.ensureAuth, usersController.updateFollowFriend);

module.exports = api;