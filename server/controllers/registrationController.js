
module.exports = (db, mailer, bcrypt, jwt, logger) => {
    const filename = __filename.slice(__dirname.length + 1);

    function logDebug(funcName, data, response) {
        logger.debug(`registration Controller: ${funcName} call()`
            + response ? `- response: ${response}` : '', { location: filename, data: data });
    }

    function logError(funcName, data, response) {
        logger.error(`registration Controller: ${funcName} call()`
            + response ? `- response: ${response}` : '', { location: filename, data: data });
    }

    function messageResponse(res, message, status) {
        return res.status(status).json({
            message: message
        });
    }

    function register(req, res) {
        try {
            let message = ''
            let status = ''
            logDebug('register', req.body.email)
            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    message = "user already exist,try again"
                    status = 409
                    logDebug(`register`, req.body.email, `status ${status} message ${message}`)
                    return messageResponse(res, message, status)
                }
                db.addUser(req.body, result => {
                    mailer.verifyAccountMail(result);

                    message = "User Created Successfully , Please check Your Mail To Verify Your Account"
                    status = 201
                    logDebug(`register`, req.body.email, `status ${status} message ${message}`)
                    return messageResponse(res, message, status)
                });
            });
        } catch (error) {
            message = "Internal Server Error"
            status = 500
            logError(`register ${message}`, req.body.email, `status ${status}`)
            return messageResponse(res, message, status)
        }
    }

    function login(req, res) {
        console.log("registration Controller: login call()");
        try {
            logger.debug(`registration Controller: login call() - start processing for ${req.body.email}`,
                { location: filename });

            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    if (!user.active) {
                        logger.debug(`registration Controller: login call() - finish processing for ${req.body.email} response: status: 409`,
                            { location: filename });
                        return res.status(409).json({
                            message:
                                "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It"
                        });
                    }
                    if (bcrypt.checkPassword(req.body.password, user.password)) {
                        let token = jwt.createToken(user);
                        logger.debug(`registration Controller: login call() - finish processing for ${req.body.email} response: status: 200`,
                            { location: filename });
                        return res.status(200).json({
                            message: "Authorize successful",
                            token: token
                        });
                    } else
                        logger.debug(`registration Controller: login call() - finish processing for ${req.body.email} response: status: 401`,
                            { location: filename });
                    return res.status(401).json({
                        message: "Wrong Password"
                    });
                }
            });
        } catch (error) {
            logger.error(`registration Controller: login call() - catch error - response: status: 500`,
                { location: filename, err: error });
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
    function verifyAccount(req, res) {
        logger.debug(`registration Controller: verifyAccount call() - start processing for ${req.body.id}`,
            { location: filename });
        try {
            db.find("Users", "_id", req.body.id, user => {
                if (user && user.active) {
                    logger.debug(`registration Controller: verifyAccount call() - finish processing for ${user.id} response: status: 409`,
                        { location: filename });
                    res.status(409).json({
                        message: "your account is already active"
                    });
                }
                else if (user) {
                    db.verifyAccount(req.body.id, result => {
                        logger.debug(`registration Controller: verifyAccount call() - finish processing for ${result.id} response: status: 200`,
                            { location: filename });
                        res.status(200).json({
                            message: "active account Successfully , you can log in now"
                        });
                    });
                }
                else {
                    logger.debug(`registration Controller: verifyAccount call() - finish processing for ${req.body.id} response: status: 404`,
                        { location: filename });
                    res.status(404).json({
                        message: "User did not found"
                    });
                }
            });
        } catch (error) {
            logger.error(`registration Controller: verifyAccount call() - catch error - response: status: 500`,
                { location: filename, err: error });
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
    function forgetPassword(req, res) {
        logger.debug(`registration Controller: forgetPassword call() - start processing for ${req.body.id}`,
            { location: filename });
        try {
            db.find("Users", "_id", req.body.id, user => {
                if (user && bcrypt.checkPassword(req.body.user.resetCode, user.resetPasswordCode)) {
                    db.changePassword(user, req.body.user.newPassword, success => {
                        if (success) {
                            logger.debug(`registration Controller: forgetPassword call() - finish processing for ${req.body.id} response: status: 201`,
                                { location: filename });
                            res.status(201).json({
                                message: "password change successfuly"
                            });
                        }
                        else {
                            logger.debug(`registration Controller: forgetPassword call() - finish processing for ${req.body.id} response: status: 401`,
                                { location: filename });
                            return res.status(401).json({
                                message: "Auth failed"
                            });
                        }
                    });
                }
            });
        } catch (error) {
            logger.error(`registration Controller: forgetPassword call() - catch error - response: status: 500`,
                { location: filename, err: error });
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
    function getResetCodePassword(req, res) {
        logger.debug(`registration Controller: getResetCodePassword call() - start processing for ${req.body.userMail}`,
            { location: filename });
        try {
            db.find("Users", "email", req.body.userMail, user => {
                let priveteUser = user;
                db.getResetCodePassword(priveteUser, userResetCode => {
                    if (userResetCode) {
                        mailer.forgotPasswordMail(userResetCode);
                        logger.debug(`registration Controller: getResetCodePassword call() - finish processing for ${req.body.userMail} response: status: 201`,
                            { location: filename });
                        return res.status(201).json({
                            message: "ok"
                        });
                    } else {
                        logger.debug(`registration Controller: getResetCodePassword call() - finish processing for ${req.body.userMail} response: status: 401`,
                            { location: filename });
                        return res.status(401).json({
                            message: "Failure to get Reset Code Password"
                        });
                    }
                });
            });
        } catch (error) {
            logger.error(`registration Controller: getResetCodePassword call() - catch error - response: status: 500`,
                { location: filename, err: error });
            return res.status(500).json({
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