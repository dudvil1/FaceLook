
const filename = __filename.slice(__dirname.length + 1);

module.exports = (db, mailer, bcrypt, jwt, registrationHelper) => {

    const { loginResponse, registerResponse, verifyAccountResponse, forgetPasswordResponse, getResetCodeResponse, log, errorResponse } = registrationHelper

    function register(req, res) {
        try {
            const { userAlreadyExistResponse, successRegisterResponse, worngPasswordResponse } = registerResponse

            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    return userAlreadyExistResponse(res, filename, req.body.email);
                }
                else {
                    return successRegisterResponse(res, filename, req.body, db, mailer);
                }
            });
        } catch (error) {
            return errorResponse.errorHandler(res, filename, error, 'Register');
        }
    }
    function login(req, res) {
        try {
            const { userIsNotActiveResponse, successLoginResponse, validateInCompleteResponse } = loginResponse

            db.find("Users", "email", req.body.email, user => {
                if (user) {
                    if (!user.active)
                        return userIsNotActiveResponse(res, filename, req.body.email);
                    if (bcrypt.checkPassword(req.body.password, user.password))
                        return successLoginResponse(res, filename, req.body.email, user, jwt);
                }
                return validateInCompleteResponse(res, filename, req.body.email);
            });
        } catch (error) {
            return errorResponse.errorHandler(res, filename, error, 'Login');
        }
    }
    function verifyAccount(req, res) {
        try {
            const { accountAlreadyActive, successVerifyAccount, accountNotFound } = verifyAccountResponse

            db.find("Users", "_id", req.body.id, user => {
                if (user && user.active) {
                    accountAlreadyActive(res, req.body.email)
                }
                else if (user) {
                    db.verifyAccount(req.body.id, result => {
                        successVerifyAccount(res, req.body.email)
                    });
                }
                else {
                    accountNotFound(res, req.body.email)
                }
            });
        } catch (error) {
            return errorResponse.errorHandler(res, filename, error, 'verifyAccount');
        }
    }
    function forgetPassword(req, res) {
        try {
            const { failChangeFassword, successChangeFassword, validateResteCodeInComplete } = forgetPasswordResponse
            const resetCode = req.body.user.resetCode
            db.find("Users", "_id", req.body.id, user => {
                if (user && bcrypt.checkPassword(resetCode, user.resetPasswordCode)) {
                    db.changePassword(user, req.body.user.newPassword, success => {
                        success ? successChangeFassword(res, filename, req.body.id) : failChangeFassword(res, filename, req.body.id)
                    });
                }
                else {
                    validateResteCodeInComplete(res, filename, { id: req.body.id, resetCode: req.body.user.resetCode })
                }
            });
        } catch (error) {
            return errorResponse.errorHandler(res, filename, error, 'forgetPassword');
        }
    }
    function getResetCodePassword(req, res) {
        try {
            const { failCreateResetCode, successCreateResetCode, accountNotFound } = getResetCodeResponse
            db.find("Users", "email", req.body.userMail, user => {
                if (user) {
                    db.getResetCodePassword(user, userResetCode => {
                        if (userResetCode) {
                            successCreateResetCode(res, filename, user, mailer, userResetCode)
                        } else {
                            failCreateResetCode(res, filename, user)
                        }
                    });
                }
                else {
                    accountNotFound(res, filename, req.body.userMail)
                }
            });
        } catch (error) {
            return errorResponse.errorHandler(res, filename, error, 'getResetCodePassword');
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
