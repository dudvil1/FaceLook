module.exports = (sql, connectionString, mongoose, bcrypt) => {

    async function addUser(user, callback) {
        console.log("dbManeger: addUser call()");

        user.password = await bcrypt.createHashPassword(user.password);
        user._id = new mongoose.Types.ObjectId();

        const query = `INSERT INTO Users VALUES( '${user._id}','${user.name}' , '${user.password}' , 'user' , '${user.email}' , '0')`;
        await sql.query(connectionString, query, (err, res) => {
            callback(user);
        });
    }
    async function verifyAccount(userId, callback) {
        console.log("dbManeger: verifyAccount call()");

        const query = `UPDATE Users
                    SET active = '1'
                    WHERE _id = '${userId}'`;
        await sql.query(connectionString, query, (err, rows) => {
            if (err) console.log("verifyAccountErr:", err);
            callback("ok");
        });
    }
    async function changePassword(userEmail, newpassword) {
        console.log("dbManeger: changePassword call()");

        await User.find({
            email: userEmail
        })
            .exec()
            .then(user => {
                if (user) {
                    User.update(
                        {
                            email: userEmail
                        },
                        {
                            $set: {
                                password: newpassword
                            }
                        }
                    );
                    return true;
                }
            })
            .catch(err => {
                return err;
            });
    }
    function getUsers(callback, filter, userId) {

        console.log("dbmaneger: getUsers call()");

        const query = `select *
                       From Users
    
                       left JOIN (select * From user_friends where user_friends.friendId = '${userId}') as friends ON friends.userId = Users._id
                     
                     where Users._id !='${userId}' 
                     ${filter ? `And (Users.name like '%${filter}%' OR Users.email like '%${filter}%')` : ""}`;

        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                //logger
                console.log(err)
            }
            callback(rows);
        });
    }

    function getUser(userId, callback) {

        console.log("dbmaneger: getUser call()");

        const query = `select * From Users
                       LEFT JOIN user_friends ON user_friends.userId =Users._id
                       
                       where Users._id ='${userId}'`;

        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.log(err)
            }
            callback(rows ? rows[0] : rows);
        });
    }


    return {
        verifyAccount,
        addUser,
        changePassword,
        getUsers,
        getUser
    };
}
