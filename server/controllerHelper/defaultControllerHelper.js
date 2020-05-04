module.exports = (logger) => {
    function logDebug(funcName, data, response, filename) {
        logger.debug(`default Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logInfo(funcName, data, response, filename) {
        logger.info(`default Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }
    function logError(funcName, data, response, filename) {
        logger.error(`default Controller: ${funcName} call() ${response ? `- response: ${response}` : ''}`,
            { location: filename, data: data });
    }

    function successHelp(res, filename) {
        let message = "Welcome To FaceLook! API Methods In http://localhost:3000/api-docs ";
        let status = 200;
        logDebug(`help`, undefined, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }

    function successStatus(res, filename, moment, version) {
        let message = {
            api: 'social',
            status: 'OK',
            version: version,
            time: moment().unix()
        };
        let status = 200;
        logDebug(`status`, undefined, `status ${status} message ${message}`, filename);
        return responseJson(res, { message }, status);
    }
    function responseJson(res, response, status) {
        return res.status(status).json(response);
    }

    return {
        log: {
            logError,
            logInfo,
            logDebug
        },
        helpResponse: {
            successHelp
        },
        statusResponse: {
            successStatus
        }
    }
}