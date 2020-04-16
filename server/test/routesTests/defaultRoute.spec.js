const { chai, assert, should, expect, sinon } = require("../baseTest");

const server = require('../../server')

 describe("Test the Default routes", function() {
  this.timeout(20000); 
  it("test the / route", (done) => {
     chai
      .request(server) 
       .get("/") 
       .end(function (err, res) {
        expect(err).to.be.null; 
        expect(res).to.have.status(200);  
        expect(res.body).to.be.a('object')
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message).to.include('http://localhost:3000/api-docs');
        done();
      });
   }); 
   it('test the /status routes', function(done){
      chai
      .request(server) 
       .get("/status") 
       .end(function (err, res) {
        expect(err).to.be.null; 
        expect(res).to.have.status(200);  
        expect(res.body).to.be.a('object')
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message).to.be.a('object');
        expect(res.body.message).to.haveOwnProperty('status')
        done();
      });
   })
}); 