const container = require('./container')
require('dotenv').config()

//node_modules services
container.registerModule('http',[],require('http'),true);
container.registerModule('express',[],require('express'),true);
container.registerModule('bodyParser',[],require('body-parser'),true);
container.registerModule('morgan',[],require('morgan'),true);
container.registerModule('cors',[],require('cors'),true);
container.registerModule('path',[],require('path'));
container.registerModule('mongoose',[],require('mongoose'),true);
container.registerModule('bcryptjs',[],require('bcryptjs'),true);
container.registerModule('jwt',[],require('jwt-simple'),true);
container.registerModule('moment',[],require('moment'),true);
container.registerModule('nodemailer',[],require('nodemailer'),true);
container.registerModule('multer',[],require('multer'),true);

//config services
container.registerModule('dbConfig',[],require('./repository/DbConnection'));


//simple services
container.registerModule('bcrypt',['bcryptjs'],require('./services/bcryptService'));
container.registerModule('jwtService',['jwt','moment'],require('./services/jwtService'));
container.registerModule('multerService',['multer'],require('./services/multerService'));
container.registerModule('mailService',['nodemailer'],require('./services/mailService'));
container.registerModule('passwordGeneretor',[],require('./services/passwordGeneretor'));
container.registerModule('sql',[],require('./services/sqlService'),true);

//middlewares
container.registerModule('authenticated',['jwtService'],require('./middlewares/authenticated'));

//base Repositories
container.registerModule('baseRepo',['sql','dbConfig'],require('./repository/typeRepo/base'));
container.registerModule('postRepo',['sql','dbConfig','mongoose'],require('./repository/typeRepo/post'));
container.registerModule('tagRepo',['sql','dbConfig','mongoose','baseRepo'],require('./repository/typeRepo/tag'));
container.registerModule('userRepo',['sql','dbConfig','mongoose','bcrypt','passwordGeneretor'],require('./repository/typeRepo/user'));
container.registerModule('userFriendRepo',['sql','dbConfig'],require('./repository/typeRepo/userFriend'));

//db manager
container.registerModule('dbManager',['userRepo','baseRepo','tagRepo','postRepo','userFriendRepo'],require('./repository/dbmaneger'));

//controllers
container.registerModule('defaultController',["moment"],require('./controllers/defaultController'));
container.registerModule('friendController',["dbManager"],require('./controllers/friendController'));
container.registerModule('postsController',["dbManager"],require('./controllers/postsController'));
container.registerModule('registrationController',["dbManager",'mailService','bcrypt','jwtService'],require('./controllers/registrationController'));

//routes
container.registerModule('defaultRoutes',['express','defaultController'],require('./routes/default'));
container.registerModule('friendRoutes',['express','friendController','authenticated'],require('./routes/friend'));
container.registerModule('registrationtRoutes',['express','registrationController'],require('./routes/registration'));
container.registerModule('socialRoutes',['express','postsController','authenticated','multerService'],require('./routes/social'));


//app
container.registerModule("app",['express','bodyParser','morgan','cors','path','defaultRoutes','friendRoutes','registrationtRoutes','socialRoutes'],require('./app'));

module.exports = container
