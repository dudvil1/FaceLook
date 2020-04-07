const { chai, assert, should, expect, sinon } = require("../baseTest");

const server = require('../../server')

 describe.only("Test the Default routes", function() {
  /* const server = 'http://localhost:3000'; */
  this.timeout(20000); 
  it("test the / route", (done) => {
     chai
      .request(server) 
       .get("/") 
       .end(function (err, res) {
        expect(err).to.be.null; 
        expect(res).to.have.status(200);  
        done();
      }); 
   }); 
});  
