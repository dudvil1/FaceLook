const connectionString = require("../DbConnection");
const sql = require("msnodesqlv8");

function updateFollow(friendId, userId, callback) {
    const query = `UPDATE user_friends
    SET isFollowed = ( CASE WHEN isFollowed = 'True' THEN 'False' else 'True'END)
    WHERE user_friends.userId = '${friendId}' And user_friends.friendId = '${userId}';`;

    sql.query(connectionString, query, (err, res) => {
        if (err) console.log("from updateLikes", err);
        callback(res);
    });
}
async function addUser_Friend(friendId, userId, callback) {
    console.log("dbManeger: User_Friend call()");

    const query = `INSERT INTO user_friends VALUES
    ('${userId}', '${friendId}','False'),
    ('${friendId}', '${userId}','False')`;

    await sql.query(connectionString, query, (err, res) => {
        if (err) console.log("from addUser_Friend", err);
        callback(err ? false : true);
    });
}

module.exports = {
    updateFollow,
    addUser_Friend
};
