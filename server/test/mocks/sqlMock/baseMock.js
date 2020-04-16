module.exports = {
    find
}
function find(array, item, index, callback) {
    if (array[index] === item)
        callback(array[index])
    else
        callback(undefined)
};