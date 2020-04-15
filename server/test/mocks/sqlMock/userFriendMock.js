const users = require('../models/users')
module.exports = {
    updateFollow,
    addUser_Friend
}
function addUser_Friend(friendId, userId, callback) {
    if (users.find(item => item.id === friendId) &&
        users.find(item => item.id === userId))
        callback('ok');
    else
        callback(undefined);
}

function updateFollow(userId, friendId, callback) {
    if (users.find(item => item.id === friendId) &&
        users.find(item => item.id === userId))
        callback('ok');
    else
        callback(undefined);
}
