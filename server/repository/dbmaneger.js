module.exports = (userRepo, baseRepo, postRepo, userFriendRepo) => {

  function find(table, key, userKey, callback) {
    return baseRepo.find(table, key, userKey, callback);
  }
  function addUser(user, callback) {
    return userRepo.addUser(user, callback)
  }
  function verifyAccount(userId, callback) {
    return userRepo.verifyAccount(userId, callback)
  }
  function changePassword(userEmail, newpassword) {
    return userRepo.changePassword(userEmail, newpassword)
  }
  function addPost(post, callback) {
    return postRepo.addPost(post, callback)
  }
  function getUsers(callback, filter, userId) {
    return userRepo.getUsers(callback, filter, userId)
  }
  function getUser(userId, callback) {
    return userRepo.getUser(userId, callback)
  }
  function addPost_Tag(post_tag, callback) {
    return postRepo.addPost_Tag(post_tag, callback)
  }
  function getFilterPosts(filters, callback) {
    return postRepo.getFilterPosts(filters, callback)
  }
  function getAllPosts(callback) {
    return postRepo.getAllPosts(callback)
  }
  function addLike(data, callback) {
    return postRepo.addLike(data, callback)
  }
  function removeLike(data, callback) {
    return postRepo.removeLike(data, callback)
  }
  function updateFollow(friendId, userId, callback) {
    return userFriendRepo.updateFollow(friendId, userId, callback)
  }
  function addUser_Friend(friendId, userId, callback) {
    return userFriendRepo.addUser_Friend(friendId, userId, callback)
  }
  function changePassword(user, newPassword, callback) {
    return userRepo.changePassword(user, newPassword, callback)
  }
  function getResetCodePassword(user, callback) {
    return userRepo.getResetCodePassword(user, callback);
  }

  return {
    getFilterPosts,
    find,
    verifyAccount,
    addUser,
    getUser,
    changePassword,
    getResetCodePassword,
    addPost,
    addPost_Tag,
    getAllPosts,
    addLike,
    removeLike,
    getUsers,
    addUser_Friend,
    updateFollow
  }
}


