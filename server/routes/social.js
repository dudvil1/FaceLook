module.exports = (nodeServices, postsController, md_auth, multer) => {
    const { express } = nodeServices
    const api = express.Router();

    api.post("/addPost", [md_auth.ensureAuth, multer.single("image")], postsController.addPost);
    api.get("/getPosts", md_auth.ensureAuth, postsController.getAllPosts);
    api.get("/filterPosts/:filters", md_auth.ensureAuth, postsController.getFilterPosts);
    api.patch("/addLike", md_auth.ensureAuth, postsController.addLike);
    api.patch("/removeLike", md_auth.ensureAuth, postsController.removeLike);
    return api;
};
