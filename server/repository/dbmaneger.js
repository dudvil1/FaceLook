// const Base = require("./typeRepo/base");
// const Post = require("./typeRepo/post");
// const User = require("./typeRepo/user");
// const Tag = require("./typeRepo/tag");
// const UserFriend = require("./typeRepo/userFriend");

// async function find(table, key, userKey, callback) {
//   return await Base.find(table, key, userKey, callback);
// }
// async function addUser(user, callback) {
//   return await  User.addUser(user, callback) 
// }
// async function verifyAccount(userId, callback) {
//   return await  User.verifyAccount(userId, callback)
// }
// async function changePassword(userEmail, newpassword) {
//   return await  User.changePassword(userEmail, newpassword)
// }
// async function addPost(post, callback) {
//   return await  Post.addPost(post, callback) 
// }
// function getUsers(callback, filter, userId) {
//   return User.getUsers(callback, filter, userId) 
// }
// function getUser(callback,userId) {
//   return User.getUser(callback,userId) 
// }
// async function addTag(tag, callback) {
//   return await Tag.addTag(tag, callback)
// }
// async function addPost_Tag(post_tag, callback) {
//   return await Post.addPost_Tag(post_tag, callback)
// }
// function getFilterPosts(filters, callback) {
//   return  Post.getFilterPosts(filters, callback) 
// }
// function getAllPosts(callback) {
//   return  Post.getAllPosts( callback) 
// }
// function updateLikes(post, callback) {
//   return  Post.updateLikes(post, callback)
// }
// function updateFollow(friendId,userId, callback) {
//   return UserFriend.updateFollow(friendId,userId, callback)
// }
// async function addUser_Friend(friendId,userId, callback) {
//   return await UserFriend.addUser_Friend(friendId,userId, callback) 
// }

// module.exports = {
//   getFilterPosts,
//   find,
//   verifyAccount,
//   addUser,
//   getUser,
//   changePassword,
//   addPost,
//   addTag,
//   addPost_Tag,
//   getAllPosts,
//   updateLikes,
//   getUsers,
//   addUser_Friend,
//   updateFollow
// };

module.exports = (userRepo, baseRepo, tagRepo, postRepo, userFriendRepo) => {

  async function find(table, key, userKey, callback) {
    return await baseRepo.find(table, key, userKey, callback);
  }
  async function addUser(user, callback) {
    return await userRepo.addUser(user, callback)
  }
  async function verifyAccount(userId, callback) {
    return await userRepo.verifyAccount(userId, callback)
  }
  async function changePassword(userEmail, newpassword) {
    return await userRepo.changePassword(userEmail, newpassword)
  }
  async function addPost(post, callback) {
    return await postRepo.addPost(post, callback)
  }
  function getUsers(callback, filter, userId) {
    return userRepo.getUsers(callback, filter, userId)
  }
  function getUser(callback, userId) {
    return userRepo.getUser(callback, userId)
  }
  async function addTag(tag, callback) {
    return await tagRepo.addTag(tag, callback)
  }
  async function addPost_Tag(post_tag, callback) {
    return await postRepo.addPost_Tag(post_tag, callback)
  }
  function getFilterPosts(filters, callback) {
    return postRepo.getFilterPosts(filters, callback)
  }
  function getAllPosts(callback) {
    return postRepo.getAllPosts(callback)
  }
  function updateLikes(post, callback) {
    return postRepo.updateLikes(post, callback)
  }
  function updateFollow(friendId, userId, callback) {
    return userFriendRepo.updateFollow(friendId, userId, callback)
  }
  async function addUser_Friend(friendId, userId, callback) {
    return await userFriendRepo.addUser_Friend(friendId, userId, callback)
  }
  async function changePassword(user,newPassword, callback) {
    return await  User.changePassword(user, newPassword,callback)
  }
  async function getResetCodePassword(user,callback){
     return await User.getResetCodePassword(user,callback);
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
    addTag,
    addPost_Tag,
    getAllPosts,
    updateLikes,
    getUsers,
    addUser_Friend,
    updateFollow
  }
}


