const { assert, should, expect, sinon } = require("../baseTest");

const users = require('../mocks/models/users')
const UserModule = require('../../models/user')
const RegisterController = require('../../controllers/registrationController')
const loggerMock = require('../mocks/loggerServiceMock');
const db = require('../mocks/dbMock');
const jwt = require('../mocks/jwtServiceMock');
const mailer = require('../mocks/mailerServiceMock');
const bcrypt = require('../../services/bcryptService')({ bcryptjs: require('bcryptjs') });
const registrationHelper = require("../../controllerHelper/registrationControllerHelper")(loggerMock);

describe('registration Controller Tests', () => {
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
        registrationCtrl = RegisterController(db, mailer, bcrypt, jwt, registrationHelper)
    });
    //register
    it('test the register() return success when email not exist', (done) => {
        const userMock = new UserModule(106, 'new', '123', 'user', 'g@g.com', '1')
        SetReqBody(req, userMock);
        const { callbackJson, callbackStatus } = expectStatusAndJson(201,
            { message: "User Created Successfully , Please check Your Mail To Verify Your Account" }, done);
        registrationCtrl.register(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the register() return error 409 when email exist', (done) => {
        const userMock = { ...users[0] }
        SetReqBody(req, userMock);
        const { callbackJson, callbackStatus } = expectStatusAndJson(409,
            { message: "user already exist,try again" }, done);
        registrationCtrl.register(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the register() return error ', (done) => {
        let dbMock = { addUser: function () { throw new Error() } }
        const registrationCtrl = setNewRegisterController(dbMock)
        expectErrorHandler(done, registrationCtrl.register, req, sendExpect);
    });

    //login
    it('test the login() return success when email exist ,user is active and pasword is correct', (done) => {
        const tokenMock = 'ssssss'
        const userMock = { ...users[0] }
        SetReqBody(req, userMock);

        const bcryptMock = mockService(bcrypt, { checkPassword: () => true })
        const jwtMock = mockService(jwt, { createToken: () => tokenMock })
        const registrationCtrl = setNewRegisterController(undefined, undefined, bcryptMock, jwtMock)

        const { callbackJson, callbackStatus } = expectStatusAndJson(200,
            {
                message: "Authorize successful",
                token: tokenMock
            }, done);
        registrationCtrl.login(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the login() return error 409 when email exist ,but user is not active', (done) => {
        const dbMock = mockService(db, { find: (table, key, value, callback) => { callback({ active: false }) } })

        const registrationCtrl = setNewRegisterController(dbMock)

        const { callbackJson, callbackStatus } = expectStatusAndJson(409,
            { message: "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It" }, done);
        registrationCtrl.login(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the login() return error 401 when email not exist', (done) => {
        //user not exist
        const dbMock = mockService(db, { find: (table, key, value, callback) => { callback(undefined) } })
        const registrationCtrl = setNewRegisterController(dbMock)

        const { callbackJson, callbackStatus } = expectStatusAndJson(401,
            { message: "Wrong Password Or Email" }, done);
        registrationCtrl.login(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the login() return error 500 when catch error', (done) => {
        const dbMock = mockService(db, { find: (table, key, value, callback) => { throw {} } })
        const registrationCtrl = setNewRegisterController(dbMock)

        expectErrorHandler(done, registrationCtrl.login, req, sendExpect);
    });

    //verifyAccount
    it('test the verifyAccount() return eroor 409 when user is already active', (done) => {
        SetReqBody(req, { id: users[0]._id });
        const { callbackJson, callbackStatus } = expectStatusAndJson(409,
            { message: "your account is already active" }, done);
        registrationCtrl.verifyAccount(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the verifyAccount() return success 200 when user is not active', (done) => {
        SetReqBody(req, { id: users[0]._id });
        const dbMock = mockService(db, { find: (table, key, value, callback) => { callback({ ...users[0], active: false }) } })
        const registrationCtrl = setNewRegisterController(dbMock)
        const { callbackJson, callbackStatus } = expectStatusAndJson(200,
            { message: "active account Successfully , you can log in now" }, done);
        registrationCtrl.verifyAccount(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the verifyAccount() return eroor 404 when user is not exist', (done) => {
        SetReqBody(req, { id: undefined });
        const { callbackJson, callbackStatus } = expectStatusAndJson(404,
            { message: "User did not found" }, done);
        registrationCtrl.verifyAccount(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the verifyAccount() return error 500 when catch error', (done) => {
        const dbMock = mockService(db, { find: (table, key, value, callback) => { throw {} } })
        const registrationCtrl = setNewRegisterController(dbMock)

        expectErrorHandler(done, registrationCtrl.verifyAccount, req, sendExpect);
    });

    //forgetPassword
    it('test the forgetPassword() return eroor 400 when user exist ,but resetCode is not valid', (done) => {
        SetReqBody(req, { id: users[0]._id, user: { ResetCode: 122 } });

        const { callbackJson, callbackStatus } = expectStatusAndJson(400,
            { message: "Wrong ResetCode Or User" }, done);
        registrationCtrl.forgetPassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the forgetPassword() return eroor 400 when user is not exist', (done) => {
        SetReqBody(req, { id: 'not exist', user: { ResetCode: 122 } });
        const { callbackJson, callbackStatus } = expectStatusAndJson(400,
            { message: "Wrong ResetCode Or User" }, done);
        registrationCtrl.forgetPassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the forgetPassword() return success 201 when user exist ,resetCode validate and db.changePassword() success', (done) => {
        SetReqBody(req, { id: users[0]._id, user: { ResetCode: 122 } });
        const dbMock = mockService(db, {
            find: (table, key, value, callback) => callback({}),
            changePassword: (user, password, callback) => callback(true)
        })
        const bcryptMock = mockService(bcrypt, { checkPassword: () => true })
        const registrationCtrl = setNewRegisterController(dbMock, undefined, bcryptMock)

        const { callbackJson, callbackStatus } = expectStatusAndJson(201,
            { message: "password change successfuly" }, done);
        registrationCtrl.forgetPassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the forgetPassword() return error 401 when user exist ,resetCode validate, but db.changePassword() fail', (done) => {
        SetReqBody(req, { id: users[0]._id, user: { ResetCode: 122 } });
        const dbMock = mockService(db, {
            find: (table, key, value, callback) => callback({}),
            changePassword: (user, password, callback) => callback(false)
        })
        const bcryptMock = mockService(bcrypt, { checkPassword: () => true })
        const registrationCtrl = setNewRegisterController(dbMock, undefined, bcryptMock)

        const { callbackJson, callbackStatus } = expectStatusAndJson(401,
            { message: "Auth failed" }, done);
        registrationCtrl.forgetPassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the forgetPassword() return error 500 when catch error', (done) => {
        const dbMock = mockService(db, { find: (table, key, value, callback) => { throw {} } })
        const registrationCtrl = setNewRegisterController(dbMock)

        expectErrorHandler(done, registrationCtrl.forgetPassword, req, sendExpect);
    });

    //forgetPassword
    it('test the getResetCodePassword() return eroor 404 when user is not exist', (done) => {
        SetReqBody(req, { userMail: 'user not exist' });
        const { callbackJson, callbackStatus } = expectStatusAndJson(404,
            { message: "User did not found" }, done);
        registrationCtrl.getResetCodePassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the getResetCodePassword() return success 201 when user exist,and get new reset code succeed', (done) => {
        SetReqBody(req, { userMail: users[0].email });
        const { callbackJson, callbackStatus } = expectStatusAndJson(201,
            { message: "ok" }, done);
        registrationCtrl.getResetCodePassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the getResetCodePassword() return error 401 when user is not exist,but get new reset code failed', (done) => {
        SetReqBody(req, { userMail: users[0].email });

        const dbMock = mockService(db, { getResetCodePassword: (user, callback) => callback(false) })
        const registrationCtrl = setNewRegisterController(dbMock)


        const { callbackJson, callbackStatus } = expectStatusAndJson(401,
            { message: "Failure to get Reset Code Password" }, done);
        registrationCtrl.getResetCodePassword(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the getResetCodePassword() return error 500 when catch error', (done) => {
        const dbMock = mockService(db, { find: (table, key, value, callback) => { throw {} } })
        const registrationCtrl = setNewRegisterController(dbMock)

        expectErrorHandler(done, registrationCtrl.getResetCodePassword, req, sendExpect);
    });

});

function expectErrorHandler(done, action, req, sendExpect) {
    const { callbackJson, callbackStatus } = expectStatusAndJson(500, "Internal Server Error", done);
    action(req, sendExpect(callbackStatus, callbackJson));
}

function mockService(service, overrideObject) {
    return {
        ...service,
        ...overrideObject
    };
}

function setNewRegisterController(dbMock, mailerMock, bcryptMock, jwtMock) {
    return RegisterController(
        dbMock ? dbMock : db,
        mailerMock ? mailerMock : mailer,
        bcryptMock ? bcryptMock : bcrypt,
        jwtMock ? jwtMock : jwt,
        registrationHelper
    )
}

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
