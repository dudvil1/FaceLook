module.exports = (sql, connectionString, mongoose, bcrypt, passwordGeneretor) => {

    function addUser(user, callback) {
        console.log("dbManeger: addUser call()");

        user.password = bcrypt.createHashPassword(user.password);
        user._id = new mongoose.Types.ObjectId();

        const query = `INSERT INTO Users VALUES( '${user._id}','${user.name}' , '${user.password}' , 'user' , '${user.email}' , '0')`;
        sql.add(connectionString, query, callback);
    }
    function verifyAccount(userId, callback) {
        console.log("dbManeger: verifyAccount call()");

        const query = `UPDATE Users
                    SET active = '1'
                    WHERE _id = '${userId}'`;
        sql.update(connectionString, query, callback);
    }
    function changePassword(user, newPassword, callback) {
        console.log("dbManeger: changePassword call()");

        let hash = bcrypt.createHashPassword(newPassword);

        const query = `UPDATE Users
                         SET password = '${hash}' , resetPasswordCode = ''
                         WHERE _id = '${user._id}'`;

        sql.update(connectionString, query, callback);
    }
    function getUsers(callback, filter, userId) {

        console.log("dbmaneger: getUsers call()");

        const query = `select *
                       From Users
    
                       left JOIN (select * From User_Friend where User_Friend.friendId = '${userId}') as friends ON friends.userId = Users._id
                     
                     where Users._id !='${userId}' 
                     ${filter ? `And (Users.name like '%${filter}%' OR Users.email like '%${filter}%')` : ""}`;

        sql.getMany(connectionString, query, callback);
    }

    function getUser(userId, callback) {

        console.log("dbmaneger: getUser call()");

        const query = `select * From Users
                       LEFT JOIN User_Friend ON User_Friend.userId =Users._id
                       
                       where Users._id ='${userId}'`;

        sql.getOne(connectionString, query, callback);
    }

    function getResetCodePassword(user, callback) {
        console.log("dbManeger: getResetCodePassword call()");
        user.resetCode = passwordGeneretor.generatePassword();
        user.resetCodeBcrypt = bcrypt.createHashPassword(user.resetCode);

        console.log("after user", user);

        const query = `UPDATE Users
                         SET password = '' , resetPasswordCode = '${user.resetCodeBcrypt}'
                         WHERE email = '${user.email}'`;
        sql.getOne(connectionString, query, (success) => {
            if (success) {
                callback(resetCode)
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
