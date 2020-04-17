const { assert, should, expect, sinon } = require("../baseTest");

const friendController = require('../../controllers/friendController')
const loggerMock = require('../mocks/loggerServiceMock');
const dbMock = require('../mocks/dbMock');
const friendHelper = require("../../controllerHelper/friendControllerHelper")(loggerMock);

describe('friend Controller Tests', () => {
    let req;
    const frndCtrl = friendController(dbMock, friendHelper);
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
            body: {
                userId: 1,
                friendId: 3,
            },
            params: {
                data: `{ "userId":"1", "filter":{} }`
            }
        };
    });

    it('test the searchUsers() with valid parameters', () => {
        callbackStatus = (code) => expect(code).to.equal(201)
        callbackJson = (json) => dbMock.getUsers((users) => expect(json).to.eql(users), {}, 1)
        frndCtrl.searchUsers(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the searchUsers() with unvalid parameters', () => {
        req.params.data = `{"userId":"8","filter":null}`;
        callbackStatus = (code) => expect(code).to.equal(401)
        callbackJson = (data) => expect(data.message).to.equal('Failure to Find Users')
        frndCtrl.searchUsers(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the searchUsers() with unvalid request', () => {
        req = {};
        let res = {
            json: function (err) {
            },
            status: function (responseStatus) {
                assert.equal(responseStatus, 500);
                return this;
            }
        }
        frndCtrl.searchUsers(req, res);
    });

    it('test the updateFollowFriend() with valid parameters', () => {
        callbackStatus = (code) => expect(code).to.equal(200)
        callbackJson = (data) => expect(data._id).to.equal(req.body.friendId)
        frndCtrl.updateFollowFriend(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the updateFollowFriend() with unvalid parameters', () => {
        req.body.userId = 7;
        callbackStatus = (code) => expect(code).to.equal(401)
        callbackJson = (data) => expect(data.message).to.equal('Failure to Follow Friend')
        frndCtrl.updateFollowFriend(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the updateFollowFriend() with unvalid request', () => {
        req = {};
        let res = {
            json: function (err) {
            },
            status: function (responseStatus) {
                assert.equal(responseStatus, 500);
                return this;
            }
        }
        frndCtrl.updateFollowFriend(req, res);
    });


    it('test the addFriend() with valid parameters', () => {
        callbackStatus = (code) => expect(code).to.equal(200)
        callbackJson = (data) => expect(data._id).to.equal(req.body.friendId)
        frndCtrl.addFriend(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the addFriend() with unvalid parameters', () => {
        req.body.userId = 7;
        callbackStatus = (code) => expect(code).to.equal(401)
        callbackJson = (data) => expect(data.message).to.equal('Failure to Add Friend')
        frndCtrl.addFriend(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the addFriend() with unvalid request', () => {
        req = {};
        let res = {
            json: function (err) {
            },
            status: function (responseStatus) {
                assert.equal(responseStatus, 500);
                return this;
            }
        }
        frndCtrl.addFriend(req, res);
    });
});