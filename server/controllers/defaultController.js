module.exports = (moment, logger) => {
    const version = '0.2.0';
    const filename = __filename.slice(__dirname.length + 1);

    function help(req, res) {
    logger.debug(`help call() -`, { location: filename }); 
         res.status(200).send({
            message: 'Welcome To FaceLook! API Methods In http://localhost:3000/api-docs '
        });
    }

    function status(req, res) {
         logger.debug(`status call() -`, { location: filename });
         res.status(200).send({
            message: {
                api: 'social',
                status: 'OK',
                version: version,
                time: moment().unix()
            }
        });
    }

    return {
        help,
        status
    };
}
