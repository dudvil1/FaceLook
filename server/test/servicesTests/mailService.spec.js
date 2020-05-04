const { assert, should, expect, sinon } = require('../baseTest')

const mail = require('../../services/mailService');

describe('mailSevice Tests', function () {
  let nodemailerService
  let mailService
  let sendMailSpy

  function nodemailerWithTransport(createTransport) {
    return {
      createTransport: createTransport
    }
  }

  function nodemailerWithSendMail(sendMail) {
    return {
      createTransport: function (...params) {
        return {
          sendMail: sendMail
        }
      }
    }
  }

  beforeEach(() => {
    sendMailSpy = sinon.spy();
    nodemailerService = nodemailerWithSendMail(sendMailSpy)

    mailService = setMailService(nodemailerService);
  })

  it('test onInit createTransport with auth obj', function (done) {
    nodemailerService = nodemailerWithTransport((params) => {
      const { auth } = params

      expect(auth).to.not.be.undefined
      expect(auth).to.be.haveOwnProperty('user')
      expect(auth).to.be.haveOwnProperty('pass')
      done()
    })
    mailService = setMailService(nodemailerService);
  });

  it('test onInit createTransport with gmail service', function (done) {
    nodemailerService = nodemailerWithTransport((param) => {
      const { service } = param
      expect(service).to.equal('gmail')
      done()
    })
    mailService = setMailService(nodemailerService);
  });

  it('test sendMail() is called once for verifyAccountMail() with valid param (email && _id)', function () {
    mailService.verifyAccountMail({ email: "guy", _id: "1234" })
    expect(sendMailSpy).to.have.been.calledOnce
  });

  it('test sendMail() is`nt called for verifyAccountMail() with empty object', function () {
    mailService.verifyAccountMail({})
    expect(sendMailSpy).to.not.have.been.called
  });

  it('test sendMail() is`nt called for verifyAccountMail() with undefined', function () {
    mailService.verifyAccountMail()
    expect(sendMailSpy).to.not.have.been.called
  });

  it('test sendMail() is called with the received email for verifyAccountMail()', function (done) {
    const obj = {
      email: 'ggg@ggg.com',
      _id: '12343423'
    }
    nodemailerService = nodemailerWithSendMail(({ to }) => {
      expect(to).to.equal(obj.email)
      done()
    })
    mailService = setMailService(nodemailerService);
    mailService.verifyAccountMail(obj)
  });

  it('test sendMail() is called with the received email for forgotPasswordMail()', function (done) {
    const obj = {
      email: 'ggg@ggg.com',
      _id: '12343423'
    }
    nodemailerService = nodemailerWithSendMail(({ to }) => {
      expect(to).to.equal(obj.email)
      done()
    })
    mailService = setMailService(nodemailerService);
    mailService.forgotPasswordMail(obj)
  });

  it('test sendMail() is called once for forgotPasswordMail() with valid param (email && _id)', function () {
    mailService.forgotPasswordMail({ email: "guy", _id: "1234" })
    expect(sendMailSpy).to.have.been.calledOnce
  });

  it('test sendMail() is`nt called for forgotPasswordMail() with empty object', function () {
    mailService.forgotPasswordMail({})
    expect(sendMailSpy).to.not.have.been.called
  });

  it('test sendMail() is`nt called for verifyAccountMail() with undefined', function () {
    mailService.forgotPasswordMail()
    expect(sendMailSpy).to.not.have.been.called
  });

});
function setMailService(nodemailerService) {
  const mailService = mail({ nodemailer: nodemailerService });
  return mailService;
}

