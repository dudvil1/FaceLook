
module.exports = (db, postsHelper) => {
  const filename = __filename.slice(__dirname.length + 1);
  const { addPostResponse, getPostsResponse, filterPostsResponse, addLikeResponse, removeLikeResponse, errorHandler } = postsHelper

  function addPost(req, res) {
    req.body.user = req.user;
    req.body.img = req.image || 'anonym.png';

    try {
      db.addPost(req.body, postResult => {
        return addPostResponse.successAddPost(res, filename, req.body, postResult)
      });
    } catch (error) {
      errorHandler(res, filename, error, "addPost")
    }
  }
  function getAllPosts(req, res) {
    try {
      db.getAllPosts(posts => {
        return getPostsResponse.successGetAllPosts(res, filename, req.body, posts)
      });
    } catch (error) {
      errorHandler(res, filename, error, "getAllPosts")
    }
  }
  function getFilterPosts(req, res) {
    try {
      const filters = JSON.parse(req.params.filters);
      db.getFilterPosts(filters, posts => {
        filterPostsResponse.successFilterPosts(res, filename, { filters }, posts)
      });
    } catch (error) {
      errorHandler(res, filename, error, "getFilterPosts")
    }
  }
  function addLike(req, res) {
    try {
      db.addLike(req.body, (post) => {
        return addLikeResponse.successAddLikePost(res, filename, req.body, post)
      })
    } catch (error) {
      errorHandler(res, filename, error, "addLike")
    }
  }
  function removeLike(req, res) {
    try {
      db.removeLike(req.body, (post) => {
        return removeLikeResponse.successRemoveLikePost(res, filename, req.body, post)
      })
    } catch (error) {
      errorHandler(res, filename, error, "removeLike")
    }
  }
  return {
    addPost,
    getAllPosts,
    addLike,
    getFilterPosts,
    removeLike
  }
}
