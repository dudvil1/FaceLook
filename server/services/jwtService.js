var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Secret_Key1-2-3.';

exports.createtoken = function (user) {
    console.log("jwtService: createToken call()");

    user.expired = moment().add(3, 'days').unix();    
    return jwt.encode(user, secret);
}; 