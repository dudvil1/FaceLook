const { assert, should, expect, sinon } = require("../baseTest");
const chai = require("chai");
chai.use(require("chai-http"));

describe.only("Test the "/" routes", () => {
  const server = "http://localhost:3000";
  it("", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if(err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
