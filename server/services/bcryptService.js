module.exports = (bcrypt) => {
  const hashKey = Number(process.env.BCRYPT_HASH_KEY) || 10;
  
  function checkPassword(reqPassword, userPassword) {
    console.log("bycrptService: checkPassword call()");

    return bcrypt.compareSync(reqPassword, userPassword);
  }

  function createHashPassword(password) {
    console.log("bycrptService: createHashPassword call()");

    return bcrypt.hashSync(password, hashKey);
  }

  return {
    checkPassword,
    createHashPassword
  };
}
