module.exports = (bcrypt) => {

  function checkPassword(reqPassword, userPassword) {
    console.log("bycrptService: checkPassword call()");

    return bcrypt.compareSync(reqPassword, userPassword);
  }

  function createHashPassword(password) {
    console.log("bycrptService: createHashPassword call()");
    
    return bcrypt.hashSync(password, 10);
  }

  return {
    checkPassword,
    createHashPassword
  };
}
