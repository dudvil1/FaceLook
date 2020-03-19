module.exports = (express, postsController, md_auth, multer) => {
    const api = express.Router();

    api.post("/addPost", postsController.addPost);
    api.get("/getPosts", postsController.getAllPosts);
    api.get("/filterPosts/:filters", md_auth.ensureAuth, postsController.getFilterPosts);
    api.patch("/updateLikes", md_auth.ensureAuth, postsController.updateLikes);
    return api;
};
