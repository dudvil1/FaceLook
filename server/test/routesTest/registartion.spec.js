const { chai, assert, should, expect, sinon } = require("../baseTest");
const rgstCtrl = '';

describe("test for the Registration routes", function() {
  this.timeout(20000);
  const server = "http://localhost:3000/registration";
  const registration = require('../../routes/registration');

  it("test the /login routes - send valid parameters", done => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "dudvil1@gmail.com", password: "1234" })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(200);
        expect(res.body).to.not.haveOwnProperty("erorr");
        done();
      });
  });
  it("test the /login routes - send unValid parameters", done => {
    chai
      .request(server)
      .post("/login")
      .send({ email: "test@gmail.com", password: "1234" })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.status).to.not.equal(404);
        expect(res.body).to.not.haveOwnProperty("erorr");
        done();
      });
  });

  it('test the /register route', (done)=> {
    chai
      .request(server)
      .post('/register')
      .send({name:'testName', email:'test@gmail.com', password:'testpassword'})
      .end( (err,res) => {
        done();
      })
  })

});
