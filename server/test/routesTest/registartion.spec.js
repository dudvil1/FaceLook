const { chai, assert, should, expect, sinon } = require("../baseTest");

describe("test the Registration routes", function () {
  this.timeout(20000);
  const server = "http://localhost:3000/registration";
  it("test the /register routes", done => {
    const route = chai.request(server)
      .post("/login")
      .send({ email: "dudvil1@gmail.com", password: "1234" })


    CheckRouteExist(route, done);
  });
});
function CheckRouteExist(route, done) {
  route.end(function (err, res) {
    expect(err).to.be.null;
    expect(res.status).to.not.equal(404);
    expect(res.body).to.not.haveOwnProperty('erorr');
    done();
  });
}

