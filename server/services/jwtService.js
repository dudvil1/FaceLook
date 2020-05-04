module.exports = (nodeServices) => {
  const { moment, jwtsimple } = nodeServices

  let secret = process.env.JWT_SECRET || "secret";

  createToken = user => {
    user.expired = moment()
      .add(3, "days")
      .unix();
    return jwtsimple.encode(user, secret);
  };

  decodeToken = token => {
    return jwtsimple.decode(token, secret);
  };

  isTokenExpire = token => {
      if (token) {
        const payload = decodeToken(token);
        return payload.expired <= moment().unix();
      }
      return true;
  };

  return {
    createToken,
    decodeToken,
    isTokenExpire
  };
};
