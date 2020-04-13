module.exports = (logger) => {
    return (socket) => {
        listeningAddPost(socket);
        listeningUpdateLike(socket);
    }

    function listeningAddPost(socket) {
        socket.on('addPost', (post) => {
            try {
                logInfo(logger, "addPost");
                socket.broadcast.emit('addPostChange', post)
            } catch (error) {
                logError(logger, error, "addPost");
            }
        });
    }

    function listeningUpdateLike(socket) {
        socket.on('updateLike', (post) => {
            try {
                logInfo(logger, "updateLike");
                socket.broadcast.emit('updateLikeChange', post)
            } catch (error) {
                logError(logger, error, "updateLike");
            }
        });
    }
}

function logInfo(logger, funcName) {
    logger.info(`${funcName} has been broadcast Successfuly!!`, {});
}

function logError(logger, error, funcName) {
    logger.error(`error in socketIo Service - broadcast of ${funcName} has faild`, { err: error });
}

