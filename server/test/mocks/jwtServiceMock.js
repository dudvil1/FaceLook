module.exports = {
    createToken,
    decodeToken,
    isTokenExpire
};

//should return string
function createToken(user) {
    return JSON.stringify(user)
};
//should return object
function decodeToken(token) {
    return {}
};
//should return boolean
function isTokenExpire(token) {
    return token ? true : false;
};