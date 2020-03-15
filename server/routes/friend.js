module.exports = (express, friendController, md_auth) => {
  const api = express.Router();
  
  api.get(
    "/searchUsers/:data",
    md_auth.ensureAuth,
    friendController.searchUsers
  );
  api.post("/addFriend", md_auth.ensureAuth, friendController.addFriend);
  api.post(
    "/updateFollowFriend",
    md_auth.ensureAuth,
    friendController.updateFollowFriend
  );
  return api;
};
