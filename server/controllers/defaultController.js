module.exports = (moment) => {
    const version = '0.2.0';

    function help(req, res) {
        res.status(200).send({
            message: 'Welcome To FaceLook! API Version: ' + version + ' ;-)'
        });
    }

    function status(req, res) {
        res.status(200).send({
            message: {
                'api': 'social',
                'status': 'OK',
                'version': version,
                'time': moment().unix()
            }
        });
    }

    return {
        help,
        status
    };
}
