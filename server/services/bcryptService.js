const bcrypt = require("bcryptjs");

function checkPassword(reqPassword, userPassword) {
  console.log("bycrptService: checkPassword call()");

  bcrypt.compare(reqPassword, userPassword, (err, result) => {
    if (result) return true;
    return false;
  });
}

function createHashPassword(password) {
  console.log("bycrptService: createHashPassword call()");

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return false;
    return hash;
  });
}

module.exports = {
  checkPassword,
  createHashPassword
};
