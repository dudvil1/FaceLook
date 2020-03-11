module.exports = (sql, connectionString) => {
    function updateFollow(friendId, userId, callback) {
        const query = `UPDATE User_Friend
        SET isFollowed = ( CASE WHEN isFollowed = '0' THEN '1' else '0'END)
        WHERE User_Friend.userId = '${friendId}' And User_Friend.friendId = '${userId}';`;

        sql.update(connectionString, query, callback);
    }
    function addUser_Friend(friendId, userId, callback) {
        console.log("dbManeger: User_Friend call()");

        const query = `INSERT INTO User_Friend VALUES
        ('${userId}', '${friendId}','0'),
        ('${friendId}', '${userId}','0')`;

        sql.add(connectionString, query, callback);
    }

    return {
        updateFollow,
        addUser_Friend
    };
}
