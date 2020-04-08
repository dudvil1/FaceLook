const container = require('./container')
require('dotenv').config()

module.exports = async () => {

    container.registerModule('nodeServices', [], require('./nodeModuleContainer'));
    //simple services
    container.registerModule('bcryptService', ['nodeServices'], require('./services/bcryptService'));
    container.registerModule('loggerService', ['nodeServices'], require('./services/loggerService'));
    container.registerModule('jwtService', ['nodeServices'], require('./services/jwtService'));
    container.registerModule('multerService', ['nodeServices'], require('./services/multerService'));
    container.registerModule('mailService', ['nodeServices'], require('./services/mailService'));
    container.registerModule('passwordGeneretor', [], require('./services/passwordGeneretor'));
    container.registerModule('sqlAsync', ['loggerService', 'nodeServices'], require('./services/sqlService'));
    const sql = await container.getModule('sqlAsync')
    container.registerModule('sql', [], sql);
    container.registerModule('elasticsearchService', ['nodeServices'], require('./services/elasticsearchService'));
    container.registerModule('socketService', [], require('./services/socketService'));

    //middlewares
    container.registerModule('authenticated', ['jwtService'], require('./middlewares/authenticated'));

    //base Repositories
    container.registerModule('baseRepo', ['sql'], require('./repository/typeRepo/base'));
    container.registerModule('postRepo', ['elasticsearchService', 'nodeServices'], require('./repository/typeRepo/postElastic'));
    container.registerModule('userRepo', ['sql', "elasticsearchService", 'nodeServices', 'bcryptService', 'passwordGeneretor'], require('./repository/typeRepo/userElastic'));
    container.registerModule('userFriendRepo', ['sql'], require('./repository/typeRepo/userFriend'));

    //db manager
    container.registerModule('dbManager', ['userRepo', 'baseRepo', 'postRepo', 'userFriendRepo'], require('./repository/dbmaneger'));


    //controllersHelpers
    container.registerModule('defaultHelper', [], require('./controllerHelper/defaultControllerHelper'));
    container.registerModule('friendHelper', [], require('./controllerHelper/friendControllerHelper'));
    container.registerModule('postsHelper', [], require('./controllerHelper/postsControllerHelper'));
    container.registerModule('registrationHelper', ["loggerService"], require('./controllerHelper/registrationControllerHelper'));

    //controllers
    container.registerModule('defaultController', ["nodeServices", "loggerService"], require('./controllers/defaultController'));
    container.registerModule('friendController', ["dbManager", "loggerService"], require('./controllers/friendController'));
    container.registerModule('postsController', ["dbManager", "loggerService"], require('./controllers/postsController'));
    container.registerModule('registrationController', ["dbManager", 'mailService', 'bcryptService', 'jwtService', "registrationHelper"], require('./controllers/registrationController'));

    //routes
    container.registerModule('defaultRoutes', ['nodeServices', 'defaultController'], require('./routes/default'));
    container.registerModule('friendRoutes', ['nodeServices', 'friendController', 'authenticated'], require('./routes/friend'));
    container.registerModule('registrationtRoutes', ['nodeServices', 'registrationController'], require('./routes/registration'));
    container.registerModule('socialRoutes', ['nodeServices', 'postsController', 'authenticated', 'multerService'], require('./routes/social'));

    //app
    container.registerModule("app", ['nodeServices', 'defaultRoutes', 'friendRoutes', 'registrationtRoutes', 'socialRoutes', 'loggerService'], require('./app'));

    return container

}
// module.exports = container
