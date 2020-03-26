const { assert, should, expect, sinon } = require('../baseTest');

const bcryptService = require('../../services/bcryptService');
const bcrypt = require('bcryptjs');

describe('bcryptService Tests', function() {
    
    it('check the HashSync function',function(){
      let Password = '1234';
      bcryptService.createHashPassword(Password);
      console.log(bcryptPassword);
      
      expect(bcryptPassword).to.not.be.eql(Password);
    })
   
});