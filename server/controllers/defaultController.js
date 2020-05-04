
module.exports = (nodeServices, defaultHelper) => {
    const { moment } = nodeServices
    const version = '0.2.0';
    const filename = __filename.slice(__dirname.length + 1);

    const { helpResponse, statusResponse } = defaultHelper

    function help(req, res) {
        return helpResponse.successHelp(res, filename)
    }
    function status(req, res) {
        return statusResponse.successStatus(res, filename, moment, version)
    }

    return {
        help,
        status
    };
}
