const { createLogger, format, transports } = require("winston");
const elasticsearch = require('elasticsearch');
module.exports = {
    createLogger,
    format,
    transports,
    elasticsearch
}