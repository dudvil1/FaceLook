module.exports = (db,mailer,bcrypt,jwt) => {
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
            await db.find("Users", "email", req.body.email, users => {
                if (users.length >= 1) {
                    const user = users[0]
                    //check the activation
                    if (!user.active) {
                        return res.status(401).json({
                            message:
                                "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It"
                        });
                    }
                    //check password
                    console.log(bcrypt.checkPassword(req.body.password, user.password));
    
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
    async function verifyAccount(req, res) {
        console.log("registration Controller: verifyAccount() call");
    
        try {
            await db.find("Users", "_id", req.body.id, user => {
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
    async function forgetPassword(req, res) {
        console.log("registration Controller: forgotPassword call()", req.body);
    
        try {
            await db.find("Users", "_id", req.body.id, user => {
                console.log("sdsd", user[0]);
    
                if (bcrypt.checkPassword(req.body.user.resetCode, user[0].resetPasswordCode)) {
                    db.changePassword(user[0], req.body.user.newPassword, answer => {
                        res.status(201).json({
                            message: "password change successfuly"
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
    async function getResetCodePassword(req, res) {
        console.log("getResetCodePassword call()");
    
        try {
            await db.find("Users", "email", req.body.userMail, user => {
                let priveteUser = user[0];
                db.getResetCodePassword(priveteUser, userResetCode => {
                    mailer.forgotPasswordMail(userResetCode);
                    return res.status(201).json({
                        message: "ok"
                    });
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