module.exports = (nodeServices) => {
  const { bcryptjs } = nodeServices

  const hashKey = Number(process.env.BCRYPT_HASH_KEY) || 10;

  function checkPassword(reqPassword, userPassword) {
    if (reqPassword && userPassword)
      return bcryptjs.compareSync(reqPassword, userPassword);
    else
      return false
  }

  function createHashPassword(password) {
    return bcryptjs.hashSync(password, hashKey);
  }

  return {
    checkPassword,
    createHashPassword
  };
}
