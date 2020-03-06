const db = require("../repository/dbmaneger");

function searchUsers(req, res) {
  try {
    const {filter,userId} = JSON.parse(req.params.data);
    db.getUsers(posts => {
      res.status(201).json(posts);
    },filter,userId);
  } catch (error) {
    
    return res.status(401).json({
      message: "Failure, try again"
    });
  }
}
async function updateFollowFriend(req, res) {
  try {
    const {userId} = req.body;
    await db.updateLikes(req.body, (data) => {
      res.status(201).json({
        message: "Post Like updated successfuly"
      })
    })
  } catch (error) {
    console.log("ERROR: postController: updateLikes ==>");
    console.log(error.message);
    return res.status(401).json({
      message: "Failure, try again"
    })
  }
}
async function addFriend(req, res) {
  const {userId,friendId} = req.body
  
  try {
    await db.addPost(req.body, postResult => {
      db.addTag(postResult, tagResult => {
        db.addPost_Tag(tagResult, result => {
          return res.status(201).json({
            message: "post Created Successfully"
          });
        });
      });
    });
  } catch (error) {
    return res.status(401).json({
      message: "Failure to Add Friend"
    });
  }
}
module.exports = {
  searchUsers,
  updateFollowFriend,
  addFriend
};
