
module.exports = (db, logger) => {

  function addPost(req, res) {
    console.log("postController: addPost call()");
     req.body.user = req.user;
     req.body.img = req.image;

    try {
      db.addPost(req.body, postResult => {
        db.addTag(postResult, tagResult => {
          console.log("tagResult", tagResult)
          db.addPost_Tag(tagResult, result => {

        console.log(postResult)
            return res.status(201).json({
              message: "post Created Successfully"
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"

      });
    }
  }
  function getAllPosts(req, res) {
    console.log("postController: getAllPosts call()");

    try {
      db.getAllPosts(posts => {
        res.status(201).json(posts);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  function getFilterPosts(req, res) {
    try {
      console.log("postController: getFilterPosts call()");
      const filters = JSON.parse(req.params.filters);
      db.getFilterPosts(filters, posts => {
        res.status(201).json(posts);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  async function updateLikes(req, res) {
    try {
      console.log("postController: updateLikes call()");

      await db.updateLikes(req.body.post, (data) => {
        res.status(200).json({
          message: "Post-Like updated successfuly"
        })
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
  return {
    addPost,
    getAllPosts,
    updateLikes,
    getFilterPosts
  }
}
