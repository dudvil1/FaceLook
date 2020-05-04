const { assert, should, expect, sinon } = require('../baseTest')

const JWT = require("jwt-simple");
const moment = require("moment");
const jwtService = require("../../services/jwtService");

describe('jwtService tests', function () {
   let token;
   let decoded;
   let isExpire;
   let user = {
      email: 'someEmail@gmail.password',
      password: 'somePassword'
   }
   const jwt = jwtService({ jwtsimple: JWT, moment });

   it('test the createToken() create new token from Fake user input', function () {
      token = jwt.createToken(user);
      expect(token).to.not.be.eql(user);
   });
   it('test the decodeToken() decode Fake token expectly', function () {
      decoded = jwt.decodeToken(token);
      expect(decoded).to.be.eql(user);
      expect(decoded).haveOwnProperty('email');
      expect(decoded).haveOwnProperty('password');
      expect(decoded).haveOwnProperty('expired');
   });
   it('test isTokenExpire() by given illegal expierd & unillegal expierd', function () {
      isExpire = jwt.isTokenExpire(token);
      expect(isExpire).to.be.false;
      isExpire = jwt.isTokenExpire(undefined);
      expect(isExpire).to.be.true;
   })
});
