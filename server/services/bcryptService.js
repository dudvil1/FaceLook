const bcrypt = require("bcryptjs");


function checkPassword(reqPassword, userPassword) {
    bcrypt.compare(reqPassword, userPassword, (err, result) => {
      if (result)  return true;
      return false;
    });
}

function createHashPassword(password){
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return false;
      return hash;
    });
}

module.exports = {
  checkPassword,
  createHashPassword
};  
