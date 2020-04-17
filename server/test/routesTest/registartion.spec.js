const { chai, assert, should, expect, sinon } = require("../baseTest");

describe.only("test the Registration routes", function() {
  this.timeout(20000);
  const server = "http://localhost:3000/registration";
  it("test the /register routes", done => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "dudvil1@gmail.com", password: "1234" })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body).to.haveOwnProperty('token');
        done();
      });
  });
});
