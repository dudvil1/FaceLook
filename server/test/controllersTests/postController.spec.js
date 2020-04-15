const { assert, should, expect, sinon } = require("../baseTest");

const PostModule = require('../../models/elasticsearch/post')
const postController = require('../../controllers/postsController')
const loggerMock = require('../mocks/loggerServiceMock');
const dbMock = require('../mocks/dbMock');
const postHelper = require("../../controllerHelper/postsControllerHelper")(loggerMock);

describe('posts Controller Tests', () => {
    let req
    let pstCtrl
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
        pstCtrl = postController(dbMock, postHelper);
    });

    it('test the addPost() return success', (done) => {
        const postMock = new PostModule('ggg', 10, 10, '', new Date(), 32, 32)
        SetReqBody(req, postMock);
        const { callbackJson, callbackStatus } = expectStatusAndJson(201,
            { message: "post Created Successfully", post: postMock }, done);
        pstCtrl.addPost(req, sendExpect(callbackStatus, callbackJson));
    });

    it('test the addPost() catch error', (done) => {
        let dbMock = { addPost: function () { throw new Error() } }
        const pstCtrl = postController(dbMock, postHelper)
        const { callbackJson, callbackStatus } = expectStatusAndJson(500, "Internal Server Error", done);
        pstCtrl.addPost(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the getAllPosts() return success', (done) => {
        dbMock.getAllPosts((posts) => {
            const { callbackJson, callbackStatus } = expectStatusAndJson(201,
                posts, done);
            pstCtrl.getAllPosts(req, sendExpect(callbackStatus, callbackJson));
        })
    });
    it('test the getAllPosts() catch error', (done) => {
        let dbMock = { getAllPosts: function () { throw new Error() } }
        const pstCtrl = postController(dbMock, postHelper)
        const { callbackJson, callbackStatus } = expectStatusAndJson(500, "Internal Server Error", done);
        pstCtrl.getAllPosts(req, sendExpect(callbackStatus, callbackJson));
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
