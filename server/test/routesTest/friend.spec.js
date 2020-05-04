const { chai, assert, should, expect, sinon } = require("../baseTest");
const fakeToken = require('../mocks/faceTokenCreator');

describe("test for the Registration routes", function() {
  this.timeout(20000);
  const server = "http://localhost:3000/friend";
  const token = fakeToken.getFakeToken();
  
  it("test the /searchUsers/:id routes", done => {
   const userId = 'fakeUserid';
   chai
      .request(server)
      .get("/searchUsers/" + userId)
      .set('token' , token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });
  
  it("test the /addFriend routes", done => {
    chai
      .request(server)
      .post("/addFriend")
      .set('token' , token)
      .send({ })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it("test the /updateFollowFriend routes", done => {
    chai
      .request(server)
      .post("/updateFollowFriend")
      .set('token' , token)
      .send({ })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  }); 

});
