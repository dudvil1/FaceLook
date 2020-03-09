const Base = require("./typeRepo/base");
const Post = require("./typeRepo/post");
const User = require("./typeRepo/user");
const Tag = require("./typeRepo/tag");
const UserFriend = require("./typeRepo/userFriend");

async function find(table, key, userKey, callback) {
  return await Base.find(table, key, userKey, callback);
}
async function addUser(user, callback) {
  return await  User.addUser(user, callback) 
}
async function verifyAccount(userId, callback) {
  return await  User.verifyAccount(userId, callback)
}
async function addPost(post, callback) {
  return await  Post.addPost(post, callback) 
}
function getUsers(callback, filter, userId) {
  return User.getUsers(callback, filter, userId) 
}
function getUser(callback,userId) {
  return User.getUser(callback,userId) 
}
async function addTag(tag, callback) {
  return await Tag.addTag(tag, callback)
}
async function addPost_Tag(post_tag, callback) {
  return await Post.addPost_Tag(post_tag, callback)
}
function getFilterPosts(filters, callback) {
  return  Post.getFilterPosts(filters, callback) 
}
function getAllPosts(callback) {
  return  Post.getAllPosts( callback) 
}
function updateLikes(post, callback) {
  return  Post.updateLikes(post, callback)
}
function updateFollow(friendId,userId, callback) {
  return UserFriend.updateFollow(friendId,userId, callback)
}
async function addUser_Friend(friendId,userId, callback) {
  return await UserFriend.addUser_Friend(friendId,userId, callback) 
}
async function changePassword(user,newPassword, callback) {
  return await  User.changePassword(user, newPassword,callback)
}
async function getResetCodePassword(user,callback){
   return await User.getResetCodePassword(user,callback);
}

module.exports = {
  getFilterPosts,
  find,
  verifyAccount,
  addUser,
  getUser,
  changePassword,
  addPost,
  addTag,
  addPost_Tag,
  getAllPosts,
  updateLikes,
  getUsers,
  addUser_Friend,
  updateFollow,
  getResetCodePassword
};
