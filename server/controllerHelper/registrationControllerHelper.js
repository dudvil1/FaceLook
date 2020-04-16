module.exports = (logger) => {
    function successRegisterResponse(res, filename, data, db, mailer) {
        db.addUser(data, result => {
            mailer.verifyAccountMail(result);
            let message = "User Created Successfully , Please check Your Mail To Verify Your Account";
            let status = 201;
            logDebug(`register`, data, `status ${status} message ${message}`, filename);
            return responseJson(res, { message }, status);
        });
    }
    function userAlreadyExistResponse(res, filename, data) {
        let message = "user already exist,try again";
        let status = 409;
        logDebug(`register`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function validateInCompleteResponse(res, filename, data) {
        let message = "Wrong Password Or Email";
        let status = 401;
        logDebug(`login`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function successLoginResponse(res, filename, data, user, jwt) {
        let token = jwt.createToken(user);
        let message = "Authorize successful"; 
        let status = 200;
        logDebug(`login`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message: message, token: token }, status);
    }
    function userIsNotActiveResponse(res, filename, data) {
        let message = "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It";
        let status = 409;
        logDebug(`login`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function errorHandler(res, filename, error, functionName) {
        let message = "Internal Server Error";
        let status = 500;
        logError(`${functionName} ${message}`, undefined, `status ${status} error - ${error}`, filename);
        return responseJson(res, message, status);
    }
    function logDebug(funcName, data, response, filename) {
        logger.debug(`registration Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logInfo(funcName, data, response, filename) {
        logger.info(`registration Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logError(funcName, data, response, filename) {
        logger.error(`registration Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function responseJson(res, response, status) {
        return res.status(status).json(response);
    }
    function accountAlreadyActive(res, filename, data) {
        message = "your account is already active";
        status = 409;
        logDebug(`verifyAccount`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function accountNotFound(res, filename, data) {
        message = "User did not found";
        status = 404;
        logDebug(`verifyAccount`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function successVerifyAccount(res, filename, data) {
        message = "active account Successfully , you can log in now";
        status = 200;
        logDebug(`verifyAccount`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function successChangeFassword(res, filename, data) {
        message = "password change successfuly";
        status = 201;
        logDebug(`forgetPassword`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function failChangeFassword(res, filename, data) {
        message = "Auth failed";
        status = 401;
        logDebug(`forgetPassword`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function validateResteCodeInComplete(res, filename, data) {
        let message = "Wrong ResetCode Or User";
        let status = 400;
        logDebug(`forgetPassword`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function successCreateResetCode(res, filename, data, mailer, userResetCode) {
        mailer.forgotPasswordMail(userResetCode);
        message = "ok";
        status = 201;
        logDebug(`getResetCodePassword`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function failCreateResetCode(res, filename, data) {
        message = "Failure to get Reset Code Password";
        status = 401;
        logDebug(`getResetCodePassword`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    return {
        loginResponse: {
            userIsNotActiveResponse,
            successLoginResponse,
            validateInCompleteResponse,
        },
        registerResponse: {
            userAlreadyExistResponse,
            successRegisterResponse,
        },
        verifyAccountResponse: {
            accountAlreadyActive,
            successVerifyAccount,
            accountNotFound
        },
        forgetPasswordResponse: {
            successChangeFassword,
            failChangeFassword,
            validateResteCodeInComplete
        },
        getResetCodeResponse: {
            successCreateResetCode,
            failCreateResetCode,
            accountNotFound
        },
        errorResponse: {
            errorHandler
        },
        log: {
            logError,
            logInfo,
            logDebug
        },
        messageResponse: responseJson,
    }
}