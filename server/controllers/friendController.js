module.exports = (db, logger) => {
  
  function searchUsers(req, res) {
    try {
      const { filter, userId } = JSON.parse(req.params.data);
      db.getUsers(
        users => {
          res.status(201).json(users);
        },
        filter,
        userId
      );
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  function updateFollowFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      db.updateFollow(friendId, userId, data => {
        if (data) {
          db.getUser(friendId, user => {
            return res.status(200).json(user);
          });
        } else {
          return res.status(401).json({
            message: "Failure to Follow Friend"
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  function addFriend(req, res) {
    const { userId, friendId } = req.body;

    try {
      db.addUser_Friend(userId, friendId, result => {
        if (result) {
          db.getUser(friendId, user => {
            return res.status(200).json(user);
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  return {
    searchUsers,
    updateFollowFriend,
    addFriend
  };
};
