const { assert, should, expect, sinon } = require('../baseTest')

const mail = require('../../services/mailService');

describe('mailSevice Tests', function () {
  let nodemailerService
  let mailService
  let sendMailSpy

  beforeEach(() => {
    sendMail = sinon.spy();
    nodemailerService = {
      createTransport: function (...params) {
        return {
          sendMail: sendMail
        }
      }
    }
    mailService = mail(nodemailerService)
  })

  it('test onInit createTransport with gmail service', function (done) {
    nodemailerService = {
      createTransport: function (param) {
        const { service } = param
        expect(service).to.equal('gmail')
        done()
      }
    }
    mailService = mail(nodemailerService)
  });

  it('test for verifyAccountMail function with valid parameters (email && _id)', function () {
    mailService.verifyAccountMail({ email: "guy", _id: "1234" })
    expect(sendMail).to.have.been.calledOnce
  });

  it('test for verifyAccountMail function with empty object', function () {
    mailService.verifyAccountMail({})
    expect(sendMail).to.not.have.been.called
  });

  it('test for verifyAccountMail function with undefined', function () {
    mailService.verifyAccountMail()
    expect(sendMail).to.not.have.been.called
  });

});
