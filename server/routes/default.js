module.exports = (express, DefaultController) => {
    const api = express.Router();

    api.get('/', DefaultController.help);
    api.get('/status', DefaultController.status);
    return api;
};