module.exports = {
    getUsers: (cb, filter, userId) => {
        if(users.find(item => item.id == userId)) cb(users);
        else cb(undefined);
    },
    getUser: (friendId,cb) => {
        let user = users.find(item => item.id === friendId);
        cb(user);
    },
    updateFollow: (friendId, userId, cb ) => {
        if(users.find(item => item.id === friendId) &&
           users.find(item => item.id === userId)) cb('ok');
        else cb(undefined);   
    },
    addUser_Friend: (userId, friendId, cb) => {
        if(users.find(item => item.id === friendId) &&
           users.find(item => item.id === userId)) cb('ok');
           else cb(undefined);   
    }  
};


let users = [
    {
      id: 1,
      Name: "Amy wide",
      password: "6175643254",
      role: "user",
      email: "Amy12@gmail.com",
      active: "1",
      resetPasswordCode: "",
    },
    {
        id: 2,
        Name: "jim do",
        password: "6175643254",
        role: "user",
        email: "jim1@gmail.com",
        active: "1",
        resetPasswordCode: "",
    },
    {
        id: 3,
        Name: "james re",
        password: "56789",
        role: "user",
        email: "james1@gmail.com",
        active: "1",
        resetPasswordCode: "",
    },
    {
        id: 4,
        Name: "michal facker",
        password: "1234",
        role: "user",
        email: "michal1@gmail.com",
        active: "1",
        resetPasswordCode: "",
    }
  ]