
const { assert, should, expect, sinon } = require('../baseTest');
const bcryptjs = require('bcryptjs')
const bcryptService = require('../../services/bcryptService');

describe('bcryptService Tests', function () {
  const bcrypt = bcryptService({ bcryptjs });
  let Password = '1234';
  let crptPassword = bcrypt.createHashPassword(Password);

  it('test the createHashPassword() create new hash password to the input password', function () {
    expect(crptPassword).to.not.be.equal(Password);
  })
  it('test the checkPassword() when get some value as undefined should return false', function () {
    expect(bcrypt.checkPassword(undefined)).to.equal(false)
    expect(bcrypt.checkPassword('123', undefined)).to.equal(false)
  })
  it('test the checkPassword() check if return true when its compere and false when its not', function () {
    bcrypt.checkPassword(Password, crptPassword).should.be.true;
    bcrypt.checkPassword('987', crptPassword).should.be.false;
  })
  it('test onInit bycrptSevice shoud have hashKey', function () {
    //how to check it??? 
  })
});