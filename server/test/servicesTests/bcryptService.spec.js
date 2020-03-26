const { assert, should, expect, sinon } = require('../baseTest');

const bcrypt = require('../../services/bcryptService');

describe('bcryptService Tests', function() {
    let bcryptObj
    let bcryptService
    let bcryptSpy

    beforeEach(() => {
        bcryptSpy = sinon.spy();
        bcryptObj = {
            hashSync: function (firstPassword, secondPassword) {
            return {
               
            }
          },
          compareSync: function(firstPassword, secondPassword) {
             return{

             }
          }
        }
        bcryptService = bcrypt(bcryptObj);
      })
});