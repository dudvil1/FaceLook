const UserModule = require('../../../models/user')

module.exports = [
    new UserModule(1, "Amy wide", "6175643254", "user", "Amy12@gmail.com", "1"),
    new UserModule(2, "jim do", "6175643254", "user", "jim1@gmail.com", "1"),
    new UserModule(3, "james re", "56789", "user", "james1@gmail.com", "1"),
    new UserModule(4, "michal facker", "1234", "user", "michal1@gmail.com", "1"),
    new UserModule(5,'Jon Dou','12345','user',"jdou1@gmail.com",'0')
]