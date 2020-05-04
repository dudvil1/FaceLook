module.exports = (sql, logger) => {
    function updateFollow(friendId, userId, callback) {
        try {
            const query = `UPDATE User_Friend
            SET isFollowed = ( CASE WHEN isFollowed = '0' THEN '1' else '0'END)
            WHERE User_Friend.userId = '${friendId}' And User_Friend.friendId = '${userId}';`;
            logInfo(logger, query, "updateFollow")
            sql.update(query, callback);
        } catch (error) {
            logError(logger, error, "updateFollow")
            callback(undefined)
        }
    }
    function addUser_Friend(friendId, userId, callback) {
        try {
            const query = `INSERT INTO User_Friend VALUES
            ('${userId}', '${friendId}','0'),
            ('${friendId}', '${userId}','0')`;
            logInfo(logger, query, "addUser_Friend")
            sql.add(query, callback);
        } catch (error) {
            logError(logger, error, "addUser_Friend")
            callback(undefined)
        }
    }

    return {
        updateFollow,
        addUser_Friend
    };
}

function logInfo(logger, query, funcName) {
    query = typeof (query) == 'object' ? JSON.stringify(query) : query
    logger.info(`Success in UserRepo query ${query}`, { data: { function: funcName } });
}

function logError(logger, error, funcName) {
    logger.error(`Error in UserRepo`, { err: error, data: { function: funcName } });
}
