module.exports = {
    createToken,
    decodeToken,
    isTokenExpire
};

function createToken(user) {
    return JSON.stringify(user)
};
function decodeToken(token) {
    return {}
};
function isTokenExpire(token) {
    return token ? true : false;
};