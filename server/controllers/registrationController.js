
const filename = __filename.slice(__dirname.length + 1);

module.exports = (db, mailer, bcrypt, jwt, logger) => {

    function register(req, res) {
        let message = ''
        let status = 200
        try {
            logDebug('register', req.body.email)
            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    return userAlreadyExistResponse();
                }
                else {
                    return successRegisterResponse();
                }
            });
        } catch (error) {
            return errorHandler(req, res, error, 'Register');
        }
        function successRegisterResponse() {
            db.addUser(req.body, result => {
                mailer.verifyAccountMail(result);
                message = "User Created Successfully , Please check Your Mail To Verify Your Account";
                status = 201;
                logDebug(`register`, req.body.email, `status ${status} message ${message}`);
                return messageResponse(res, { message: message }, status);
            });
        }

        function userAlreadyExistResponse() {
            message = "user already exist,try again";
            status = 409;
            logDebug(`register`, req.body.email, `status ${status} message ${message}`);
            return messageResponse(res, { message: message }, status);
        }
    }
    function login(req, res) {
        let message = ''
        let status = 200
        try {
            logDebug('login', req.body.email)
            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    if (!user.active) {
                        return userIsNotActiveResponse();
                    }
                    if (bcrypt.checkPassword(req.body.password, user.password)) {
                        return SuccessLoginResponse(user);
                    }
                    else {
                        return worngPasswordResponse();
                    }
                }
            });
        } catch (error) {
            return errorHandler(req, res, error, 'Login');
        }

        function worngPasswordResponse() {
            message = "Wrong Password";
            status = 401;
            logDebug(`login`, req.body.email, `status ${status} message ${message}`);
            return messageResponse(res, { message: message, token: token }, status);
        }

        function SuccessLoginResponse(user) {
            let token = jwt.createToken(user);
            message = "Authorize successful";
            status = 200;
            logDebug(`login`, req.body.email, `status ${status} message ${message}`);
            return messageResponse(res, { message: message, token: token }, status);
        }

        function userIsNotActiveResponse() {
            message = "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It";
            status = 409;
            logDebug(`login`, req.body.email, `status ${status} message ${message}`);
            return messageResponse(res, { message: message }, status);
        }
    }
    function verifyAccount(req, res) {
        let message = ''
        let status = 200
        try {
            logDebug('verifyAccount', req.body.email)
            db.find("Users", "_id", req.body.id, user => {
                if (user && user.active) {
                    message = "your account is already active";
                    status = 409;
                    logDebug(`login`, req.body.email, `status ${status} message ${message}`);
                    return messageResponse(res, { message: message }, status);
                }
                else if (user) {
                    db.verifyAccount(req.body.id, result => {
                        message = "active account Successfully , you can log in now";
                        status = 200;
                        logDebug(`login`, req.body.email, `status ${status} message ${message}`);
                        return messageResponse(res, { message: message }, status);
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
            return errorHandler(req, res, error, 'verifyAccount');
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
            return errorHandler(req, res, error, 'forgetPassword');
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
            return errorHandler(req, res, error, 'getResetCodePassword');
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

function errorHandler(res, error, functionName) {
    message = "Internal Server Error";
    status = 500;
    logError(`${functionName} ${message}`, error, `status ${status}`);
    return messageResponse(res, message, status);
}

function logDebug(funcName, data, response) {
    logger.debug(`registration Controller: ${funcName} call()`
        + response ? `- response: ${response}` : '', { location: filename, data: data });
}

function logInfo(funcName, data, response) {
    logger.debug(`registration Controller: ${funcName} call()`
        + response ? `- response: ${response}` : '', { location: filename, data: data });
}

function logError(funcName, data, response) {
    logger.error(`registration Controller: ${funcName} call()`
        + response ? `- response: ${response}` : '', { location: filename, data: data });
}

function messageResponse(res, response, status) {
    return res.status(status).json(response);
}