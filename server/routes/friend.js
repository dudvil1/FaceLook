const express = require("express");
const friendController = require("../containerConfig").getModule('friendController');
const api = express.Router();
const md_auth = require("../containerConfig").getModule('authenticated');;

api.get("/searchUsers/:data", md_auth.ensureAuth, friendController.searchUsers);
api.post("/addFriend", md_auth.ensureAuth, friendController.addFriend);
api.post("/updateFollowFriend", md_auth.ensureAuth, friendController.updateFollowFriend);

module.exports = api;