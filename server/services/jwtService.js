module.exports = (jwt, moment) => {
    var secret = 'Secret_Key1-2-3.';

    createToken = (user) => {
        console.log("jwtService: createToken call()");

        user.expired = moment().add(3, 'days').unix();
        return jwt.encode(user, secret);
    };

    decodeToken = (token) => {
        return jwt.decode(token, secret);
    }

    isTokenExpire = (token) => {
        return jwt.isTokenExpire(token);
    }

    return {
        createtoken,
        decodeToken,
        isTokenExpire
    }
}