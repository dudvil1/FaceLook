module.exports = (jwt, moment) => {
    var secret = process.env.JWT_SECRET;

    createToken = (user) => {
        console.log("jwtService: createToken call()");

        user.expired = moment().add(3, 'days').unix();
        return jwt.encode(user, secret);
    };

    decodeToken = (token) => {
        return jwt.decode(token, secret);
    }

    isTokenExpire = (token) => {
        const payload = decodeToken(token)
        return payload.expired <= moment().unix()
    }

    return {
        createToken,
        decodeToken,
        isTokenExpire
    }
}