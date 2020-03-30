const { assert, should, expect, sinon } = require("../baseTest");

const defaultController = require("../../controllers/defaultController");
const moment = require("moment");
const logger = require("../Mocks/MockloggerService");
describe("default Controller Tests", function () {
  defCtrl = defaultController(moment, logger);
  const req = {};
  // const res = {
  //   _status: null,
  //   _json: null,
  //   status: function (code) {
  //     this._status = code
  //     return {
  //       send: function (json) {
  //         this._json = json
  //         return this
  //       }
  //     }
  //   },

  // }
  function sendExpect(callbackStatus, callbackSend) {
    return {
      status: function (code) {
        callbackStatus(code)
        return {
          send: function (data) {
            callbackSend(data)
          }
        }
      }
    }
  }
  const next = () => { };
  // const statusSpy = sinon.spy(res, "status");
  // const sendSpy = sinon.spy(res, "send");

  it("test the help() should return status and massege about api methods", function () {
    const expMessage = 'Welcome To FaceLook! API Methods In http://localhost:3000/api-docs';

    callbackStatus = (code) => expect(code).to.equal(200)
    callbackSend = (data) => expect(data.message).to.equal(expMessage)
    defCtrl.help(req, sendExpect(callbackStatus,callbackSend))
  });
});
