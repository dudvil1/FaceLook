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
    it('test the register() return success when email not exist', (done) => {
        const postMock = new PostModule('ggg', 10, 10, '', new Date(), 32, 32)
        SetReqBody(req, postMock);
        const { callbackJson, callbackStatus } = expectStatusAndJson(201,
            { message: "User Created Successfully , Please check Your Mail To Verify Your Account" }, done);
        pstCtrl.addPost(req, sendExpect(callbackStatus, callbackJson));
    });

    it('test the register() return error when email already exist exist', (done) => {
        let dbMock = { addPost: function () { throw new Error() } }
        const pstCtrl = postController(dbMock, postHelper)
        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
        pstCtrl.addPost(req, sendExpect(callbackStatus, callbackJson));
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
