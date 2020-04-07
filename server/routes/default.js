module.exports = (nodeServices, DefaultController) => {
    const {express} = nodeServices
    const api = express.Router();

    api.get('/', DefaultController.help);
    api.get('/status', DefaultController.status);
    return api;
};