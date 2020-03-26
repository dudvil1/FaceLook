const { assert, should, expect, sinon } = require('../baseTest')

const mail = require('../../services/mailService');

describe('mailSevice Tests', function () {
  let nodemailerService
  let sendMailCounter = 0
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
    mailService.verifyAccountMail()
    assert.equal(sendMailCounter, 1);
  });


});