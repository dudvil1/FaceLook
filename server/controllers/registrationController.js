module.exports = (db, mailer, bcrypt, jwt) => {
    function register(req, res) {
        console.log("registration Controller: register call()");
        try {
            //check if user exist
            db.find("Users", "email", req.body.email, users => {
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
    function login(req, res) {
        console.log("registration Controller: login call()");
        try {
            //try find request user
            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    const user = user
                    //check the activation
                    if (!user.active) {
                        return res.status(401).json({
                            message:
                                "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It"
                        });
                    }
                    //check password
                    if (bcrypt.checkPassword(req.body.password, user.password)) {
                        let token = jwt.createToken(user);
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
            });
        } catch (error) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
    }
    function verifyAccount(req, res) {
        console.log("registration Controller: verifyAccount() call");

        try {
            db.find("Users", "_id", req.body.id, user => {
                if (user.active) {
                    res.status(200).json({});
                } else {
                    db.verifyAccount(req.body.id, result => {
                        console.log("registrationVerify:", result);
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
    function forgetPassword(req, res) {
        console.log("registration Controller: forgotPassword call()", req.body);

        try {
            db.find("Users", "_id", req.body.id, user => {
                if (user && bcrypt.checkPassword(req.body.user.resetCode, user.resetPasswordCode)) {
                    db.changePassword(user, req.body.user.newPassword, success => {
                        if (success) {
                            res.status(201).json({
                                message: "password change successfuly"
                            });
                        }
                        else {
                            return res.status(401).json({
                                message: "Auth failed"
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
    function getResetCodePassword(req, res) {
        console.log("getResetCodePassword call()");

        try {
            db.find("Users", "email", req.body.userMail, user => {
                let priveteUser = user;
                db.getResetCodePassword(priveteUser, userResetCode => {
                    if (userResetCode) {
                        mailer.forgotPasswordMail(userResetCode);
                        return res.status(201).json({
                            message: "ok"
                        });
                    } else {
                        return res.status(401).json({
                            message: "Failure to get Reset Code Password"
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(401).json({
                message: "Failure to get Reset Code Password"
            });
        }
    }
    return {
        register,
        login,
        verifyAccount,
        forgetPassword,
        getResetCodePassword
    }
} 