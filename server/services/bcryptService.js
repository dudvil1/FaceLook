module.exports = (nodeServices) => {
  const { bcryptjs } = nodeServices
  
  const hashKey = Number(process.env.BCRYPT_HASH_KEY) || 10;

  function checkPassword(reqPassword, userPassword) {
    console.log("bycrptService: checkPassword call()");

    return bcryptjs.compareSync(reqPassword, userPassword);
  }

  function createHashPassword(password) {
    console.log("bycrptService: createHashPassword call()");

    return bcryptjs.hashSync(password, hashKey);
  }

  return {
    checkPassword,
    createHashPassword
  };
}
