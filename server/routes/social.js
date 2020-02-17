const express = require("express");
const postsController = require("../controllers/postsController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

const multer = require("multer");
const store = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  }
});

const upload = multer({ storage: store });

api.post(
  "/addPost", upload.single("image"),postsController.addPost
);

module.exports = api;
