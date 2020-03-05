const jwt = require("../services/jwtService");
const bcrypt = require("../services/bcryptService");
const mailer = require("../services/mailService");
const db = require("../repository/dbmaneger");

async function register(req, res) {
    console.log("registration Controller: register call()");
    try {
        //check if user exist
        await db.find("Users", "email", req.body.email, users => {
            if (users.length >= 1) {
                return res.status(401).json({
                    message: "user already exist,try again"
                });
            }
            //create && save new user send mail to verify
            db.addUser(req.body, result => {
                mailer.verifyAccountMail(result);
                return res.status(201).json({
                    message:
                        "User Created Successfully , Please check Your Mail To Verify Your Account"
                });
            });
        });
    } catch (error) {
        return res.status(401).json({
            message: "Failure to create user"
        });
    }
}

async function login(req, res) {
    console.log("registration Controller: login call()");
    try {
        //try find request user
        await db.find("Users", "email", req.body.email, user => {
                console.log(user);
                
            if (user.length >= 1) {
                //check the activation
                if (!user[0].active) {
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
                        message: "Auth failed"
                    });
            }
            // if (err) {
            //     return res.status(401).json({
            //         message: "Auth failed"
            //     });
            // }
        });
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}

async function verifyAccount(req, res) {
    console.log("registration Controller: verifyAccount() call");

    try {
        await db.find("Users", "_id", req.body.id, user => {
            console.log("registrationFind:" ,user);
            if (user.active) {
                res.status(200).json({});
            } else {
                db.verifyAccount(req.body.id, result => {
                    console.log("registrationVerify:" ,result);
                    res.status(200).json({
                        message: "active account Successfully , you can log in now"
                    });
                });
            }
        });
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}

async function forgotPassword(req, res) {
    console.log("registration Controller: forgotPassword call()");
    try {
        await db.find({ email: req.body.email }).then(user => {
            if (user) {
                let NewPassword = (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
                let hashNewPassword = NewPassword;
                db.changePassword(req.body.email, hashNewPassword).then(results => {
                    if (results) {
                        mailer.forgotPasswordMail(user, NewPassword);
                        res.status(401).json({
                            message: "Change Password!,Please Check your Email"
                        });
                    } else {
                        res.status(401).json({
                            message: "failed to change password,try again later"
                        });
                    }
                });
            }
        });
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}

module.exports = {
    register,
    login,
    verifyAccount,
    forgotPassword
};
