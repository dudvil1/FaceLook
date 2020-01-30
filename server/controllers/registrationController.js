const jwt = require("../services/jwtService");
const bcrypt = require("../services/bcryptService");
const mailer = require("../services/mailService");
const db = require("../repository/dbmaneger");

function register(req, res) {}

async function login(req, res) {
  console.log("login call()");
  try {
    //try find request user
    await db.find(req.body.email).then(user => {
      //check the activation
      if (user[0].active === false) {
        return res.status(401).json({
          message:
            "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It"
        });
      }
      //check password
      if (bcrypt.checkPassword(req.body.password, user.password)) {
        let token = jwt.createtoken(user);
        return res.status(200).json({
          message: "Auth successful",
          user: user,
          token: token
        });
      } else
        return res.status(401).json({
          message: "Auth failed, worng password"
        });
    });
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
}

function verifyAccount(req, res) {}

function forgotPassword(req, res) {}

module.exports = {
  register,
  login,
  verifyAccount,
  forgotPassword
};
