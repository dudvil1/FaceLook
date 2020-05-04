const { assert, should, expect, sinon } = require("../baseTest");

const PostModule = require('../../models/elasticsearch/post')
const postController = require('../../controllers/postsController')
const loggerMock = require('../mocks/loggerServiceMock');
const dbMock = require('../mocks/dbMock');
const postHelper = require("../../controllerHelper/postsControllerHelper")(loggerMock);
const mockPosts = require('../mocks/models/posts')

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
        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
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
        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
        pstCtrl.getAllPosts(req, sendExpect(callbackStatus, callbackJson));
    });

    it('test the getFilterPosts() return success', (done) => {
        const filters = { username: 'guy' }
        dbMock.getFilterPosts(filters, (posts) => {
            const { callbackJson, callbackStatus } = expectStatusAndJson(201,
                posts, done);
            SetReqParams(req, { filters: JSON.stringify(filters) })
            pstCtrl.getFilterPosts(req, sendExpect(callbackStatus, callbackJson));
        })
    });
    it('test the getFilterPosts() catch error req has no params', (done) => {
        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
        pstCtrl.getFilterPosts(req, sendExpect(callbackStatus, callbackJson));
    });

    it('test the addLike() return success', (done) => {
        const post = mockPosts[0]
        const { callbackJson, callbackStatus } = expectStatusAndJson(200,
            { post: post, message: "Post-Like added successfuly" }, done);

        SetReqBody(req, post.postId)
        pstCtrl.addLike(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the addLike() catch error addLike() from db return error', (done) => {
        let dbMock = { addLike: function () { throw new Error() } }
        const pstCtrl = postController(dbMock, postHelper)

        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
        pstCtrl.addLike(req, sendExpect(callbackStatus, callbackJson));
    });

    it('test the removeLike() return success', (done) => {
        const post = mockPosts[0]
        const { callbackJson, callbackStatus } = expectStatusAndJson(200,
            { post: post, message: "Post-Like removed successfuly" }, done);

        SetReqBody(req, post.postId)
        pstCtrl.removeLike(req, sendExpect(callbackStatus, callbackJson));
    });
    it('test the removeLike() catch error removeLike() from db return error', (done) => {
        let dbMock = { removeLike: function () { throw new Error() } }
        const pstCtrl = postController(dbMock, postHelper)

        const { callbackJson, callbackStatus } = expectStatusAndJson(500,
            "Internal Server Error", done);
        pstCtrl.removeLike(req, sendExpect(callbackStatus, callbackJson));
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
