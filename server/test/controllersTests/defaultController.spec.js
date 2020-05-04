const { assert, should, expect, sinon } = require("../baseTest");

const defaultController = require("../../controllers/defaultController");
const moment = require("moment");
const logger = require("../mocks/loggerServiceMock");

const defaultHelper = require("../../controllerHelper/defaultControllerHelper")(logger);

describe("default Controller Tests", function () {
  defCtrl = defaultController({ moment }, defaultHelper);

  const req = {};
  function sendExpect(callbackStatus, callbackSend) {
    return {
      status: function (code) {
        callbackStatus(code)
        return {
          json: function (data) {
            callbackSend(data)
          }
        }
      }
    }
  }

  it("test the help() should return status and massege about api methods", function () {
    const expMessage = 'Welcome To FaceLook! API Methods In http://localhost:3000/api-docs';

    callbackStatus = (code) => expect(code).to.equal(200)
    callbackSend = (data) => expect(data.message).to.include(expMessage)
    defCtrl.help(req, sendExpect(callbackStatus, callbackSend))
  });
  it('test the status() should return object about server status', () => {
    callbackStatus = (code) => expect(code).to.equal(200)
    callbackSend = (data) => expect(data.message).to.be.a('object')
    defCtrl.status(req, sendExpect(callbackStatus, callbackSend))
  });
});
