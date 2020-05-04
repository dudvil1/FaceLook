const container = require('./container')
require('dotenv').config()

const appModuleAsync = new Promise(function (resolve, reject) {
    try {
        container.registerModule('nodeServices', [], require('./nodeModuleContainer'));
        //simple services
        container.registerModule('bcryptService', ['nodeServices'], require('./services/bcryptService'));
        container.registerModule('loggerService', ['nodeServices'], require('./services/loggerService'));
        container.registerModule('jwtService', ['nodeServices'], require('./services/jwtService'));
        container.registerModule('multerService', ['nodeServices'], require('./services/multerService'));
        container.registerModule('mailService', ['nodeServices'], require('./services/mailService'));
        container.registerModule('passwordGeneretor', [], require('./services/passwordGeneretor'));
        container.registerModule('sqlAsync', ['loggerService', 'nodeServices'], require('./services/sqlService'));
        // container.registerModule('sql', [], sql);
        container.registerModule('elasticsearchService', ["loggerService", 'nodeServices'], require('./services/elasticsearchService'));
        container.registerModule('socketService', ["loggerService"], require('./services/socketService'));

        //middlewares
        container.registerModule('authenticated', ['jwtService'], require('./middlewares/authenticated'));

        container.getModule('sqlAsync').then(sql => {
            container.registerModule('sql', [], sql);
            //base Repositories
            container.registerModule('baseRepo', ['sql', 'loggerService'], require('./repository/typeRepo/base'));
            container.registerModule('postRepo', ['elasticsearchService', 'nodeServices', 'loggerService'], require('./repository/typeRepo/postElastic'));
            container.registerModule('userRepo', ['sql', "elasticsearchService", 'nodeServices', 'bcryptService', 'passwordGeneretor', 'loggerService'], require('./repository/typeRepo/userElastic'));
            container.registerModule('userFriendRepo', ['sql', 'loggerService'], require('./repository/typeRepo/userFriend'));

            //db manager
            container.registerModule('dbManager', ['userRepo', 'baseRepo', 'postRepo', 'userFriendRepo'], require('./repository/dbmaneger'));


            //controllersHelpers
            container.registerModule('defaultHelper', ["loggerService"], require('./controllerHelper/defaultControllerHelper'));
            container.registerModule('friendHelper', ["loggerService"], require('./controllerHelper/friendControllerHelper'));
            container.registerModule('postsHelper', ["loggerService"], require('./controllerHelper/postsControllerHelper'));
            container.registerModule('registrationHelper', ["loggerService"], require('./controllerHelper/registrationControllerHelper'));

            //controllers
            container.registerModule('defaultController', ["nodeServices", "defaultHelper"], require('./controllers/defaultController'));
            container.registerModule('friendController', ["dbManager", "friendHelper"], require('./controllers/friendController'));
            container.registerModule('postsController', ["dbManager", "postsHelper"], require('./controllers/postsController'));
            container.registerModule('registrationController', ["dbManager", 'mailService', 'bcryptService', 'jwtService', "registrationHelper"], require('./controllers/registrationController'));

            //routes
            container.registerModule('defaultRoutes', ['nodeServices', 'defaultController'], require('./routes/default'));
            container.registerModule('friendRoutes', ['nodeServices', 'friendController', 'authenticated'], require('./routes/friend'));
            container.registerModule('registrationtRoutes', ['nodeServices', 'registrationController'], require('./routes/registration'));
            container.registerModule('socialRoutes', ['nodeServices', 'postsController', 'authenticated', 'multerService'], require('./routes/social'));

            //app
            container.registerModule("app", ['nodeServices', 'defaultRoutes', 'friendRoutes', 'registrationtRoutes', 'socialRoutes', 'loggerService'], require('./app'));

            resolve(container)
        })
    } catch (err) {
        reject(err)
    }
})

module.exports = async () => {
    return appModuleAsync
}
// module.exports = container
