const { createLogger, format, transports } = require("winston");
const elasticsearch = require('elasticsearch');
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwtsimple = require('jwt-simple')
const moment = require('moment')
const nodemailer = require('nodemailer')
const multer = require('multer')
const swagger = require('swagger-ui-express')
const yamljs = require('yamljs')
const sql = require('mssql')
const promMid = require('express-prometheus-middleware');

module.exports = {
    promMid,
    createLogger,
    format,
    transports,
    elasticsearch,
    http,
    express,
    bodyParser,
    morgan,
    cors,
    path,
    mongoose,
    bcryptjs,
    jwtsimple,
    moment,
    nodemailer,
    multer,
    swagger,
    yamljs,
    sql
}