const { assert, should, expect, sinon } = require("../baseTest");

const passwordGen = require("../../services/passwordGeneretor");

describe("PasswordGeneretor tests", () => {
    let password = passwordGen.generatePassword();
    it('check the password is long enoght', () => {
        expect(password).to.be.a('string');
        expect(password.length).to.be.equal(8);
    })
    it('check duplicate in the generator', () => {
        let secondPassword = passwordGen.generatePassword();
        expect(secondPassword.length).to.be.equal(8);
        secondPassword.should.not.equal(password);

    })
});
