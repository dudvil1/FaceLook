const express = require("express");
const postsController = require("../containerConfig").getModule('postsController');
const api = express.Router();
const md_auth = require("../containerConfig").getModule('authenticated');;
const multer = require("../containerConfig").getModule('multerService');

api.post("/addPost", [md_auth.ensureAuth, multer.single("image")], postsController.addPost);
api.get("/getPosts", md_auth.ensureAuth, postsController.getAllPosts);
api.get("/filterPosts/:filters", md_auth.ensureAuth, postsController.getFilterPosts);
api.patch("/updateLikes", md_auth.ensureAuth, postsController.updateLikes);


module.exports = api;
