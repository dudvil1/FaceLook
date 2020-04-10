module.exports = (nodeServices) => {
  const { bcryptjs } = nodeServices
  
  const hashKey = Number(process.env.BCRYPT_HASH_KEY) || 10;

  function checkPassword(reqPassword, userPassword) {
    return bcryptjs.compareSync(reqPassword, userPassword);
  }

  function createHashPassword(password) {
    return bcryptjs.hashSync(password, hashKey);
  }

  return {
    checkPassword,
    createHashPassword
  };
}
