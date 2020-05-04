const { chai, assert, should, expect, sinon } = require("../baseTest");

describe("Test the Default routes", function () {
   this.timeout(20000);
   it("test the / route", (done) => {
      chai.request('http://localhost:3000')
         .get('/')
         .end(function (err, res) {
            expectDefault(err, res);
            done();
         });
   });
   it('test the /status routes', function (done) {
      chai.request('http://localhost:3000')
         .get("/status")
         .end(function (err, res) {
            expectStatus(err, res);
            done();
         });
   })
});  

function expectDefault(err, res) {
   expect(err).to.be.null;
   expect(res).to.have.status(200);
   expect(res.body).to.be.a('object');
   expect(res.body).to.haveOwnProperty('message');
   expect(res.body.message).to.include('http://localhost:3000/api-docs');
}

function expectStatus(err, res) {
   expect(err).to.be.null;
   expect(res).to.have.status(200);
   expect(res.body).to.be.a('object');
   expect(res.body).to.haveOwnProperty('message');
   expect(res.body.message).to.be.a('object');
   expect(res.body.message).to.haveOwnProperty('status');
}
