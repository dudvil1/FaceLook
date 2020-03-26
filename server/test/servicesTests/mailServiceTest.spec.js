const { assert, should, expect, sinon } = require('../baseTest')

const mail = require('../../services/mailService');

describe('mailSevice Tests', function () {
  let nodemailerService
  let sendMailCounter
  let mailService

  beforeEach(() => {
    sendMailCounter = 0
    nodemailerService = {
      createTransport: function (...params) {
        return {
          sendMail: function (...params) {
            sendMailCounter += 1;
          }
        }
      }
    }

    mailService = mail(nodemailerService)
  })

  it('test for verifyAccountMail function', function () {
    sinon.assert.calledWith(mySpy, "sendMail");
    mailService = mail(nodemailerService)
  });


});