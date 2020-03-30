const { assert, should, expect, sinon } = require("../baseTest");

const defaultController = require("../../controllers/defaultController");
const moment = require("moment");
const logger = require("../Mocks/MockloggerService");
describe("default Controller Tests", function() {
  defCtrl = defaultController(moment, logger);
  
  const req = {};
  const res = {
    _status: null,
    _json: null,
    status: function (code) {
      this._status = code
      return this
    },
    send: function (json) {
      this._json = json
      return this
    }
  }
  const statusSpy = sinon.spy(res, "status");
  const sendSpy = sinon.spy(res, "send");

  it("test the help() should return massege about api methods", () => {
    const expMessage = 'Welcome To FaceLook! API Methods In http://localhost:3000/api-docs';
    defCtrl.help(req, res);
    expect(statusSpy.calledOnceWith(200)).to.be.true;
    expect(sendSpy.calledOnce).to.be.true;
  });
  it('test the status() should return message about server status',() => {
     defCtrl.status(req,res);
     expect(statusSpy.calledOnceWith(200)).to.be.true;
     expect(sendSpy.calledOnce).to.be.true;
  });
});
