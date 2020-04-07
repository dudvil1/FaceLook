module.exports = (jwt, moment) => {
   let secret = process.env.JWT_SECRET || 'secret'; 

  createToken = user => {
    user.expired = moment()
      .add(3, "days")
      .unix();
    return jwt.encode(user, secret);
  };

  decodeToken = token => {
    return jwt.decode(token, secret);
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
