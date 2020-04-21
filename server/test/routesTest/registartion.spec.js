const { chai, assert, should, expect, sinon } = require("../baseTest");
const HttpsAgent = require('agentkeepalive').HttpsAgent;

const agent = new HttpsAgent({
  freeSocketTimeout: 4000
});

describe("test for the Registration routes", function () {
  this.timeout(20000);
  const server = "http://127.0.0.1:3000/registration";

  it("test the /login routes", done => {
    chai
      .request(server)
      .post("/login")
      .send({})
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      });
  });

  it('test the /register route', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      })
  })

  it('test the /verifyAccount route', (done) => {
    chai
      .request(server)
      .patch("/verifyAccount")
      .send({})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("User did not found");
        done();
      })
  })
  it('test the /forgetPassword route', (done) => {
    chai
      .request(server)
      .patch("/forgetPassword")
      .send({ email: 'test@gmail.com' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      })
  })

  it('test the /getResetCodePassword route', (done) => {
    chai
      .request(server)
      .patch("/getResetCodePassword")
      .send({})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(404);
        expect(res.body.message).to.not.be.equal("Not Found");
        done();
      })
  })
});
