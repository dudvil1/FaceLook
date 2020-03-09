
// const db = require("../containerConfig").getModule('dbManager');

// function searchUsers(req, res) {
//   try {
//     const { filter, userId } = JSON.parse(req.params.data);
//     db.getUsers(posts => {
//       res.status(201).json(posts);
//     }, filter, userId);
//   } catch (error) {
//     return res.status(401).json({
//       message: "Failure, try again"
//     });
//   }
// }
// async function updateFollowFriend(req, res) {
//   try {
//     const { userId, friendId } = req.body;
//     await db.updateFollow(friendId, userId, (data) => {
//       if (data) {
//         db.getUser(friendId, (user) => {
//           return res.status(200).json(user)
//         })
//       } else {
//         return res.status(401).json({
//           message: "Failure to Add Friend"
//         });
//       }
//     })
//   } catch (error) {
//     return res.status(401).json({
//       message: "Failure, try again"
//     })
//   }
// }
// async function addFriend(req, res) {
//   const { userId, friendId } = req.body

//   try {
//     await db.addUser_Friend(userId, friendId, (result) => {
//       if (result) {
//         db.getUser(friendId, (user) => {
//           return res.status(200).json(user)
//         })
//       } else {
//         return res.status(401).json({
//           message: "Failure to Add Friend"
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(401).json({
//       message: "Failure to Add Friend"
//     });
//   }
// }
// module.exports = {
//   searchUsers,
//   updateFollowFriend,
//   addFriend
// };


module.exports = (db) => {
  function searchUsers(req, res) {
    try {
      const { filter, userId } = JSON.parse(req.params.data);
      db.getUsers(posts => {
        res.status(201).json(posts);
      }, filter, userId);
    } catch (error) {
      return res.status(401).json({
        message: "Failure, try again"
      });
    }
  }
  async function updateFollowFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      await db.updateFollow(friendId, userId, (data) => {
        if (data) {
          db.getUser(friendId, (user) => {
            return res.status(200).json(user)
          })
        } else {
          return res.status(401).json({
            message: "Failure to Add Friend"
          });
        }
      })
    } catch (error) {
      return res.status(401).json({
        message: "Failure, try again"
      })
    }
  }
  async function addFriend(req, res) {
    const { userId, friendId } = req.body

    try {
      await db.addUser_Friend(userId, friendId, (result) => {
        if (result) {
          db.getUser(friendId, (user) => {
            return res.status(200).json(user)
          })
        } else {
          return res.status(401).json({
            message: "Failure to Add Friend"
          });
        }
      });
    } catch (error) {
      return res.status(401).json({
        message: "Failure to Add Friend"
      });
    }
  }
  return {
    searchUsers,
    updateFollowFriend,
    addFriend
  };
}