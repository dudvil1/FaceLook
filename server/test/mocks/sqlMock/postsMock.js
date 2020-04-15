
const posts = require('../models/posts')
module.exports = {
    getFilterPosts,
    addPost,
    getAllPosts,
    addLike,
    removeLike
}
function addPost(post, callback) {
    if (posts.find(p => p.id === post.postId))
        callback(undefined);
    else {
        posts.push(post);
        callback(post);
    }
}
function getFilterPosts(filters, callback) {
    callback(posts.filter(p => {
        const keys = Object.keys(filters)
        const values = Object.values(filters)
        for (let i = 0; i < keys.length; i++) {
            if (p[keys[i]] !== values[i])
                return false
        }
        return true
    }))
}
function getAllPosts(callback) {
    callback(posts)
}
function addLike(pst, callback) {
    let postAddLike = posts.find(p => p.id === pst.postId)
    if (postAddLike) {
        postAddLike.likes.amount -= 1
        callback('ok');
    }
    else
        callback(undefined);
}
function removeLike(post, callback) {
    let postRmvLike = posts.find(p => p.id === pst.postId)
    if (postRmvLike) {
        postRmvLike.likes.amount += 1
        callback('ok');
    }
    else
        callback(undefined);
}