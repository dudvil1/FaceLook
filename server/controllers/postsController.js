const db = require("../repository/dbmaneger");

async function addPost(req, res) {
  console.log("addPost call()");

  try {
    await db.addPost(req.body, postResult => {
      db.addTag(postResult, tagResult => {
        db.addPost_Tag(tagResult, result =>{
          return res.status(201).json({
            message:
                "User Created Successfully , Please check Your Mail To Verify Your Account"
        });
        })
      })
    });
  } catch (error) {
    return res.status(401).json({
      message: "Failure to create post"
    });
  }
}

module.exports = {
  addPost
};
