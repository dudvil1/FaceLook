const express = require("express");
const friendController = require("../controllers/friendController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/searchUsers/:data", md_auth.ensureAuth, friendController.searchUsers);
api.post("/addFriend", md_auth.ensureAuth, friendController.addFriend);
api.post("/updateFollowFriend", md_auth.ensureAuth, friendController.updateFollowFriend);

module.exports = api;