const { assert, should, expect, sinon } = require('../baseTest')

const mail = require('../../services/mailService');

describe('mailSevice Tests', function () {
  let nodemailerService
  let mailService

  beforeEach(() => {
  })

  it('test for verifyAccountMail function', function () {
    const sendMail = sinon.spy();
    nodemailerService = {
      createTransport: function (...params) {
        return {
          sendMail: sendMail
        }
      }
    }
    mailService = mail(nodemailerService)
    mailService.verifyAccountMail({ email: "", _id: "" })
    expect(sendMail).to.have.been.calledOnce
  });

});
