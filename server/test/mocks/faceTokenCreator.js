module.exports = {
    getFakeToken
} 

const jwt = require('jwt-simple');

function getFakeToken() {
    let user = {
        name:"fake token",
        email:"fakeToken@fakeGmail.fakeCom"
    }
   return jwt.encode(user,'secret');
}