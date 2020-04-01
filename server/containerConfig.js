const container = require('./container')
require('dotenv').config()

module.exports = async () => {

    //node_modules services
    container.registerModule('http', [], require('http'), true);
    container.registerModule('express', [], require('express'), true);
    container.registerModule('bodyParser', [], require('body-parser'), true);
    container.registerModule('morgan', [], require('morgan'), true);
    container.registerModule('cors', [], require('cors'), true);
    container.registerModule('path', [], require('path'));
    container.registerModule('mongoose', [], require('mongoose'), true);
    container.registerModule('bcryptjs', [], require('bcryptjs'), true);
    container.registerModule('jwt', [], require('jwt-simple'), true);
    container.registerModule('moment', [], require('moment'), true);
    container.registerModule('nodemailer', [], require('nodemailer'), true);
    container.registerModule('multer', [], require('multer'), true);
    container.registerModule('swaggerUi', [], require('swagger-ui-express'), true);
    container.registerModule('YAML', [], require('yamljs'), true);


    //config services
    // container.registerModule('dbConfig',[],require('./repository/DbConnection')); 


    //simple services
    container.registerModule('bcrypt', ['bcryptjs'], require('./services/bcryptService'));
    container.registerModule('loggerService', [], require('./services/loggerService'));
    container.registerModule('jwtService', ['jwt', 'moment'], require('./services/jwtService'));
    container.registerModule('multerService', ['multer'], require('./services/multerService'));
    container.registerModule('mailService', ['nodemailer'], require('./services/mailService'));
    container.registerModule('passwordGeneretor', [], require('./services/passwordGeneretor'));
    container.registerModule('sql', [],await require('./services/sqlService')(container.getModule('loggerService')));
    container.registerModule('elasticsearchService',[],require('./services/elasticsearchService'));
    container.registerModule('socketService', [], require('./services/socketService'));

    //middlewares
    container.registerModule('authenticated', ['jwtService'], require('./middlewares/authenticated'));

    //base Repositories
    container.registerModule('baseRepo', ['sql'], require('./repository/typeRepo/base'));
    container.registerModule('postRepo', ['elasticsearchService', 'mongoose'], require('./repository/typeRepo/postElastic'));
    container.registerModule('tagRepo', ['sql', 'mongoose', 'baseRepo'], require('./repository/typeRepo/tag'));
    container.registerModule('userRepo', ['sql',"elasticsearchService", 'mongoose', 'bcrypt', 'passwordGeneretor'], require('./repository/typeRepo/userElastic'));
    container.registerModule('userFriendRepo', ['sql'], require('./repository/typeRepo/userFriend'));

    //db manager
    container.registerModule('dbManager', ['userRepo', 'baseRepo', 'tagRepo', 'postRepo', 'userFriendRepo'], require('./repository/dbmaneger'));

    //controllers
    container.registerModule('defaultController', ["moment","loggerService"], require('./controllers/defaultController'));
    container.registerModule('friendController', ["dbManager","loggerService"], require('./controllers/friendController'));
    container.registerModule('postsController', ["dbManager","loggerService"], require('./controllers/postsController'));
    container.registerModule('registrationController', ["dbManager", 'mailService', 'bcrypt', 'jwtService',"loggerService"], require('./controllers/registrationController'));

    //routes
    container.registerModule('defaultRoutes', ['express', 'defaultController'], require('./routes/default'));
    container.registerModule('friendRoutes', ['express', 'friendController', 'authenticated'], require('./routes/friend'));
    container.registerModule('registrationtRoutes', ['express', 'registrationController'], require('./routes/registration'));
    container.registerModule('socialRoutes', ['express', 'postsController', 'authenticated', 'multerService'], require('./routes/social'));


    //app
    container.registerModule("app", ['express', 'bodyParser', 'morgan', 'cors', 'path', 'defaultRoutes', 'friendRoutes', 'registrationtRoutes', 'socialRoutes', 'swaggerUi', 'YAML', 'loggerService'], require('./app'));

    return container

}
// module.exports = container
