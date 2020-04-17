const users = require('../models/users')
module.exports = {
    verifyAccount,
    addUser,
    changePassword,
    getUsers,
    getUser,
    getResetCodePassword
}
function addUser(user, callback) {
    if (users.find(u => u._id === user._id))
        callback(undefined);
    else {
        users.push(user);
        callback('ok');
    }
}
function verifyAccount(userId, callback) {
    const user = users.find(u => u._id === userId)
    if (user) {
        user.active = true
        callback('ok');
    }
    else
        callback(undefined);
}
function changePassword(user, newPassword, callback) {
    if (users.find(u => u._id === user._id)) {
        user.password = newPassword
        callback('ok');
    }
    else
        callback(undefined);
}
function getUsers(callback, filter, userId) {
    if (filter)
        callback(users.filter(u => {
            if (u._id == userId)
                return false
            const keys = Object.keys(filter)
            const values = Object.values(filter)
            for (let i = 0; i < keys.length; i++) {
                if (u[keys[i]] !== values[i])
                    return false
            }
            return true
        }))
    else
        callback(undefined)
}
function getUser(userId, callback) {
    callback(users.find(u => u._id == userId))
}
function getResetCodePassword(user, callback) {
    if (users.find(u => u._id === user._id)) {
        user.password = ''
        user.resetPasswordCode = 'resetPasswordCode'
        callback('ok');
    }
    else
        callback(undefined);
}
