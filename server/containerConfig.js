const container = require('./container')

//node_modules services
container.registerModule('http',[],require('http'),true);
container.registerModule('express',[],require('express'),true);
container.registerModule('bodyParser',[],require('body-parser'),true);
container.register('morgan',[],require('morgan'),true);
container.registerModule('cors',[],require('cors'),true);
container.registerModule('path',[],require('path'));
container.registerModule('sql',[],require('msnodesqlv8'),true);
container.registerModule('mongoose',[],require('mongoose'),true);
container.registerModule('bcryptjs',[],require('bcryptjs'),true);
container.registerModule('jwt',[],require('jwt-simple'),true);
container.registerModule('moment',[],require('moment'),true);

//config services
container.registerModule('dbConfig',[],require('./repository/DbConnection'));

//simple services
container.registerModule('bcrypt',['bcryptjs'],require('./services/bcryptService'));
container.registerModule('jwtService',['jwt','moment'],require('./services/jwtService'));
container.registerModule('passwordGeneretor',[],require('./services/passwordGeneretor'));

//middlewares
// container.registerModule('authenticated',['jwtService'],require('./middlewares/authenticated'));

//base Repositories
container.registerModule('baseRepo',['sql','dbConfig'],require('./repository/typeRepo/base'));
container.registerModule('postRepo',['sql','dbConfig','mongoose'],require('./repository/typeRepo/post'));
container.registerModule('tagRepo',['sql','dbConfig','mongoose','baseRepo'],require('./repository/typeRepo/tag'));
container.registerModule('userRepo',['sql','dbConfig','mongoose','bcrypt','passwordGeneretor'],require('./repository/typeRepo/user'));
container.registerModule('userFriendRepo',['sql','dbConfig'],require('./repository/typeRepo/userFriend'));

//db manager
container.registerModule('dbManager',['userRepo','baseRepo','tagRepo','postRepo','userFriendRepo'],require('./repository/dbmaneger'));

//app
container.registerModule("app",['express','bodyParser','morgan','cors','path'],require('./app'));

module.exports = container
