const PostModule = require('../../../models/elasticsearch/post')
const users = require('./users')
module.exports = [
    new PostModule(users[0].Name,users[0].id,1,'First',new Date(),32,32,'First','',['first'],['']),
    new PostModule(users[0].Name,users[0].id,2,'second',new Date(),32,32,'second','',['second'],['']),
    new PostModule(users[0].Name,users[0].id,3,'third',new Date(),32,32,'third','',['third'],['']),
    new PostModule(users[0].Name,users[0].id,4,'fourth',new Date(),32,32,'fourth','',['fourth'],[''])
]