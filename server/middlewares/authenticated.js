module.exports = (jwtService) => {

  ensureAuth = (req, res, next) => {

    if (!req.headers.authorization) {
      return res.status(403).send({ message: "Auth failed" });
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      var payload = jwtService.decodeToken(token);
      if (jwtService.isTokenExpire(token)) {
        return res.status(401).send({ message: "Expired Token." });
      }
    } catch (ex) {
      return res.status(403).send({ message: "Forbidden: Invalid Token..." });
    }
    req.user = payload;

    next();
  };

  return {
    ensureAuth
  }
}
