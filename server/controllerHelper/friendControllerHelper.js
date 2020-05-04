module.exports = (logger) => {
    function logDebug(funcName, data, response, filename) {
        logger.debug(`friend Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logInfo(funcName, data, response, filename) {
        logger.info(`friend Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logError(funcName, data, response, filename) {
        logger.error(`friend Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }

    function errorHandler(res, filename, error, functionName) {
        let message = "Internal Server Error";
        let status = 500;
        logError(`${functionName} ${message}`, undefined, `status ${status} error - ${error}`, filename);
        return responseJson(res, message, status);
    }
    function responseJson(res, response, status) {
        return res.status(status).json(response);
    }

    function successSearchUsers(res, filename, data, users) {
        let status = 201;
        logDebug(`SearchUsers`, data, `status ${status} message Get all Users`, filename);
        return responseJson(res, users, status);
    }
    function failSearchUsers(res, filename, data) {
        let message = "Failure to Find Users"
        let status = 401;
        logDebug(`SearchUsers`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }

    function successUpdateFollow(res, filename, data, db, friendId) {
        let status = 200;
        logDebug(`updateFollowFriend`, data, `status ${status} message Update Follow Success`, filename);
        db.getUser(friendId, user => {
            return responseJson(res, user, status);
        });
    }
    function failUpdateFollow(res, filename, data) {
        let message = "Failure to Follow Friend"
        let status = 401;
        logDebug(`updateFollowFriend`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }

    function successAddFriend(res, filename, data, db, friendId) {
        let status = 200;
        logDebug(`addFriend`, data, `status ${status} message Add Friend Success`, filename);
        db.getUser(friendId, user => {
            return responseJson(res, user, status);
        });
    }
    function failAddFriend(res, filename, data) {
        let message = "Failure to Add Friend"
        let status = 401;
        logDebug(`addFriend`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }

    return {
        log: {
            logError,
            logInfo,
            logDebug
        },
        searchUsersResponse: {
            successSearchUsers,
            failSearchUsers
        },
        updateFollowResponse: {
            successUpdateFollow,
            failUpdateFollow
        },
        addFriendResponse: {
            successAddFriend,
            failAddFriend
        },
        errorHandler,
    }
}