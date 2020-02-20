const express = require("express");
const postsController = require("../controllers/postsController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");
const multer = require("../services/multerService"); 

api.post("/addPost", [md_auth.ensureAuth, multer.single("image")], postsController.addPost);
api.get("/getPosts",md_auth.ensureAuth , postsController.getAllPosts);


module.exports = api;
