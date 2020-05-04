const users = require('../models/users')
module.exports = {
    find
}
function find(tableName, key, value, callback) {
    if (tableName.toLowerCase().includes('user')) {
        const user = users.find(u => u[key] == value)
        return user ? callback(user) : callback(undefined)
    }
    else
        callback(undefined)
};