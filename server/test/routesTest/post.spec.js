const { chai, assert, should, expect, sinon } = require("../baseTest");
const fakeToken = require("../mocks/faceTokenCreator");

describe("test the /social routes", function() {
  this.timeout(20000);
  const server = "http://localhost:3000/social";
  const token = fakeToken.getFakeToken();

  it("test the /addPost routes", done => {
    chai
      .request(server)
      .post("/addPost")
      .set("token", token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it("test the /getPosts routes", done => {
    chai
      .request(server)
      .get("/getPosts")
      .set("token", token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it("test the /filterPosts/:filters routes", done => {
    let filter = {};
    chai
      .request(server)
      .get("/filterPosts/" + filter)
      .set("token", token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it("test the /addLike routes", done => {
    chai
      .request(server)
      .patch("/addLike")
      .set("token", token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it("test the /removeLike routes", done => {
    chai
      .request(server)
      .patch("/removeLike")
      .set("token", token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });
});
