const { assert, should, expect, sinon } = require("../baseTest");

const RegisterController = require('../../controllers/registrationController')
const loggerMock = require('../mocks/loggerServiceMock');
const dbMock = require('../mocks/dbMock');
const jwt = require('../mocks/jwtServiceMock');
const mailer = require('../mocks/mailerServiceMock');
const bcrypt = require('../../services/bcryptService')({ bcryptjs: require('bcryptjs') });
const registrationHelper = require("../../controllerHelper/registrationControllerHelper")(loggerMock);

describe('posts Controller Tests', () => {
    let req
    let registrationCtrl
    function sendExpect(callbackStatus, callbackJson) {
        return {
            status: function (code) {
                callbackStatus(code)
                return {
                    json: function (data) {
                        callbackJson(data)
                    }
                }
            }
        }
    };
    beforeEach(function () {
        req = {
            body: {},
            params: {}
        }
        registrationCtrl = RegisterController(dbMock, mailer, bcrypt, jwt, registrationHelper)
    });


});

function expectStatusAndJson(status, json, done) {
    callbackStatus = (code) => expect(code).to.equal(status);
    callbackJson = (data) => {
        expect(data).to.eql(json);
        done()
    };

    return { callbackJson, callbackStatus }
}

function SetReqBody(req, body) {
    req.body = body;
}
function SetReqParams(req, params) {
    req.params = params;
}
