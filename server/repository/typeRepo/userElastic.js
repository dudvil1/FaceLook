const UserModule = require("../../models/elasticsearch/postUser")

module.exports = (sql, elasticSql, nodeServices, bcrypt, passwordGeneretor, logger) => {
    const { mongoose } = nodeServices

    function addUser(user, callback) {
        try {
            user.password = bcrypt.createHashPassword(user.password);
            user._id = new mongoose.Types.ObjectId();

            const query = `INSERT INTO Users VALUES( '${user._id}','${user.name}' , '${user.password}' , 'user' , '${user.email}' , '0',${null})`;
            logInfo(logger, query, "addUser")
            sql.add(query, (isSuccess) => {
                if (isSuccess) {
                    AddPostUserElastic(user, callback)
                }
                else {
                    callback(isSuccess)
                }
            });
        } catch (error) {
            logError(logger, error, "addUser")
            callback(undefined)
        }
    }
    function AddPostUserElastic(user, callback) {
        try {
            const newUser = new UserModule(user._id, user.name, user.email)
            const query = {
                index: 'posts',
                id: user._id.toString(),
                body: newUser
            }
            logInfo(logger, query, "AddPostUserElastic")
            elasticSql.add(query, (success) => {
                callback(success ? user : undefined)
            });

        } catch (error) {
            logError(logger, error, "AddPostUserElastic")
            callback(undefined)
        }

    }
    function verifyAccount(userId, callback) {
        try {
            const query = `UPDATE Users
            SET active = '1'
            WHERE _id = '${userId}'`;
            logInfo(logger, query, "verifyAccount")
            sql.update(query, callback);
        } catch (error) {
            logError(logger, error, "verifyAccount")
            callback(undefined)
        }
    }
    function changePassword(user, newPassword, callback) {
        try {
            let hash = bcrypt.createHashPassword(newPassword);

            const query = `UPDATE Users
            SET password = '${hash}' , resetPasswordCode = ''
            WHERE _id = '${user._id}'`;

            logInfo(logger, query, "changePassword")
            sql.update(query, callback);
        } catch (error) {
            logError(logger, error, "changePassword")
            callback(undefined)
        }
    }
    function getUsers(callback, filter, userId) {
        try {
            const query = `select * From Users 
            left JOIN (select * From User_Friend where User_Friend.friendId = '${userId}') as friends 
            ON friends.userId = Users._id where Users._id !='${userId}' And active = '1' 
            ${filter ? `And (Users.name like '%${filter}%' OR Users.email like '%${filter}%')` : ""}`;
            logInfo(logger, query, "getUsers")
            sql.getMany(query, callback);
        } catch (error) {
            logError(logger, error, "getUsers")
            callback([])
        }
    }
    function getUser(userId, callback) {
        try {
            const query = `select * From Users LEFT JOIN User_Friend ON User_Friend.userId =Users._id where Users._id ='${userId}'`;
            logInfo(logger, query, "getUser")
            sql.getOne(query, callback);
        } catch (error) {
            logError(logger, error, "getUser")
            callback(undefined)
        }
    }
    function getResetCodePassword(user, callback) {
        try {
            user.resetCode = passwordGeneretor.generatePassword();
            user.resetCodeBcrypt = bcrypt.createHashPassword(user.resetCode);

            const query = `UPDATE Users SET password = '' , resetPasswordCode = '${user.resetCodeBcrypt}' WHERE email = '${user.email}'`;
            logInfo(logger, query, "getResetCodePassword")
            sql.update(query, (success) => {
                if (success) {
                    callback(user)
                }
                else {
                    callback(undefined)
                }
            });
        } catch (error) {
            logError(logger, error, "getResetCodePassword")
            callback(undefined)
        }
    }
    return {
        verifyAccount,
        addUser,
        changePassword,
        getUsers,
        getUser,
        getResetCodePassword
    };
}
function logInfo(logger, query, funcName) {
    query = typeof (query) == 'object' ? JSON.stringify(query) : query
    logger.info(`Success in UserRepo query ${query}`, { data: { function: funcName } });
}

function logError(logger, error, funcName) {
    logger.error(`Error in UserRepo`, { err: error, data: { function: funcName } });
}
