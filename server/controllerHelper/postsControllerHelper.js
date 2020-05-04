module.exports = (logger) => {
    function logDebug(funcName, data, response, filename) {
        logger.debug(`posts Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logInfo(funcName, data, response, filename) {
        logger.info(`posts Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logError(funcName, data, response, filename) {
        logger.error(`posts Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
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
    function successAddPost(res, filename, data, post) {
        let message = "post Created Successfully"
        let status = 201;
        logDebug(`addPost`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { post, message }, status);
    }
    function successGetAllPosts(res, filename, data, posts) {
        let status = 201;
        logDebug(`getAllPosts`, data, `status ${status} message Get All Posts`, filename);
        return responseJson(res, posts, status);
    }
    function successFilterPosts(res, filename, data, posts) {
        let status = 201;
        logDebug(`getFilterPosts`, data, `status ${status} message Get Filter Posts Success`, filename);
        return responseJson(res, posts, status);
    }
    function successAddLikePost(res, filename, data, post) {
        let message = "Post-Like added successfuly"
        let status = 200;
        logDebug(`addPost`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { post, message }, status);
    }
    function successRemoveLikePost(res, filename, data, post) {
        let message = "Post-Like removed successfuly"
        let status = 200;
        logDebug(`addPost`, data, `status ${status} message ${message}`, filename);
        return responseJson(res, { post, message }, status);
    }


    return {
        log: {
            logError,
            logInfo,
            logDebug
        },
        addPostResponse: {
            successAddPost
        },
        getPostsResponse: {
            successGetAllPosts
        },
        filterPostsResponse: {
            successFilterPosts
        },
        addLikeResponse: {
            successAddLikePost
        },
        removeLikeResponse: {
            successRemoveLikePost
        },

        errorHandler,
    }
}