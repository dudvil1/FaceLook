module.exports = (db, friendHelper) => {
  const filename = __filename.slice(__dirname.length + 1);
  const { searchUsersResponse, updateFollowResponse, addFriendResponse, errorHandler } = friendHelper

  function searchUsers(req, res) {
    try {
      const { filter, userId } = JSON.parse(req.params.data);
      const { successSearchUsers, failSearchUsers } = searchUsersResponse

      db.getUsers((users) => {
        return users ? successSearchUsers(res, filename, { filter, userId }, users) :
          failSearchUsers(res, filename, { filter, userId })
      }, filter, userId);

    } catch (error) {
      return errorHandler(res, filename, error, "searchUsers")
    }
  }

  function updateFollowFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      const { successUpdateFollow, failUpdateFollow } = updateFollowResponse
      db.updateFollow(friendId, userId, data => {
        return data ? successUpdateFollow(res, filename, req.body, db, friendId) :
          failUpdateFollow(res, filename, req.body)
      });
    } catch (error) {
      return errorHandler(res, filename, error, "updateFollowFriend")
    }
  }

  function addFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      const { successAddFriend, failAddFriend } = addFriendResponse
      db.addUser_Friend(userId, friendId, result => {
        return result ? successAddFriend(res, filename, req.body, db, friendId) :
          failAddFriend(res, filename, req.body)
      });
    } catch (error) {
      return errorHandler(res, filename, error, "searchUsers")
    }
  }
  return {
    searchUsers,
    updateFollowFriend,
    addFriend
  };
};
