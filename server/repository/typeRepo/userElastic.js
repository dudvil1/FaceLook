const UserModule = require("../../models/elasticsearch/postUser")

module.exports = (sql, elasticSql, nodeServices, bcrypt, passwordGeneretor) => {
    const { mongoose } = nodeServices

    function addUser(user, callback) {

        user.password = bcrypt.createHashPassword(user.password);
        user._id = new mongoose.Types.ObjectId();

        const query = `INSERT INTO Users VALUES( '${user._id}','${user.name}' , '${user.password}' , 'user' , '${user.email}' , '0',${null})`;
        sql.add(query, (isSuccess) => {
            if (isSuccess) {
                AddPostUserElastic(user, callback)
            }
            else {
                callback(isSuccess)
            }
        });
    }

    function AddPostUserElastic(user, callback) {
        try {
            const newUser = new UserModule(user._id, user.name, user.email)
            const query = {
                index: 'posts',
                id: user._id.toString(),
                body: newUser
            }

            elasticSql.add(query, (success) => {
                callback(success ? user : undefined)
            });

        } catch (error) {
        }

    }
    function verifyAccount(userId, callback) {

        const query = `UPDATE Users
                    SET active = '1'
                    WHERE _id = '${userId}'`;
        sql.update(query, callback);
    }
    function changePassword(user, newPassword, callback) {

        let hash = bcrypt.createHashPassword(newPassword);

        const query = `UPDATE Users
                         SET password = '${hash}' , resetPasswordCode = ''
                         WHERE _id = '${user._id}'`;

        sql.update(query, callback);
    }
    function getUsers(callback, filter, userId) {
        const query = `select *
                       From Users
    
                       left JOIN (select * From User_Friend where User_Friend.friendId = '${userId}') as friends ON friends.userId = Users._id
                     
                     where Users._id !='${userId}' 
                     And active = '1'
                     ${filter ? `And (Users.name like '%${filter}%' OR Users.email like '%${filter}%')` : ""}`;

        sql.getMany(query, callback);
    }

    function getUser(userId, callback) {
        const query = `select * From Users
                       LEFT JOIN User_Friend ON User_Friend.userId =Users._id
                       
                       where Users._id ='${userId}'`;

        sql.getOne(query, callback);
    }

    function getResetCodePassword(user, callback) {
        user.resetCode = passwordGeneretor.generatePassword();
        user.resetCodeBcrypt = bcrypt.createHashPassword(user.resetCode);

        const query = `UPDATE Users
                         SET password = '' , resetPasswordCode = '${user.resetCodeBcrypt}'
                         WHERE email = '${user.email}'`;
        sql.update(query, (success) => {
            if (success) {
                callback(user)
            }
            else {
                callback(undefined)
            }
        });
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
