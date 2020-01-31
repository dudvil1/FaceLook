const jwt = require("../services/jwtService");
const bcrypt = require("../services/bcryptService");
const mailer = require("../services/mailService");
const db = require("../repository/dbmaneger");

async function register(req, res) {
    console.log("register call()");
    try {
        //check if user exist
        await db.find(req.body.email).then(user => {
            return res.status(401).json({
                message:
                    "user already exist,try again"
            });
        });
        //create new user
        let hashPassword = bcrypt.createHashPassword(req.body.password);
        let newUser = {
            id = 1,
            name = req.body.name,
            email = req.body.name,
            password = hashPassword,
            role = "user",
            active: false
        };
        //save new user send mail to verify
        await db.addUser(newUser).then(resault => {
            mailer.verifyAccountMail(newUser);
            return res.status(201).json({
                message:
                    "User Created Successfully , Please check Your Mail To Verify Your Account"
            });
        });
    } catch (error) {
        return res.status(401).json({
            message: "Failure to create user"
        });
    }
}

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

async function verifyAccount(req, res) {
    console.log("verifyAccount() call");
    try {
        await db.find(req.body.email).then(user => {
            if (user.active === true) {
                res.status(200).json({});
            } else {
                await db.verifyAccount(req.body.email).then(res => {
                    res.status(200).json({
                        message:
                            "active account Successfully , you can log in now"
                    });
                })
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}

async function forgotPassword(req, res) { }

module.exports = {
    register,
    login,
    verifyAccount,
    forgotPassword
};
