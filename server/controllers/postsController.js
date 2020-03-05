const db = require("../repository/dbmaneger");

async function addPost(req, res) {
  console.log("postController: addPost call()");
  req.body.user = req.user;
  req.body.img = req.image;
  console.log("test", req.image);
  

  console.log("addpost", req.body.img);
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
      message: "Failure to create post"
    });
  }
}

function getAllPosts(req, res) {
  console.log("postController: getAllPosts call()");

  try {
    db.getAllPosts(posts => {

      if (posts){
        const validPosts = posts.map(post=>{
          post.date = new Date(post.date)
          return post
        })
        validPosts.sort(comparePostByDate);

        
        res.status(201).json(validPosts);
        return;
      }
      res.status(201).json(posts);
    });
  } catch (error) {
    return res.status(401).json({
      message: "Failure, try again"
    });
  }
}

function comparePostByDate(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function getFilterPosts(req, res) {

  try {
    const filters = JSON.parse(req.params.filters);
    db.getFilterPosts(filters,posts => {
      res.status(201).json(posts);
    });
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({
      message: "Failure, try again"
    });
  }
}

async function updateLikes(req, res) {
  try {
    // await db.updateLikes(req.body.markerElm, (data)=>{
    await db.updateLikes(req.body.post, (data) => {
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


module.exports = {
  addPost,
  getAllPosts,
  updateLikes,
  getFilterPosts
};
