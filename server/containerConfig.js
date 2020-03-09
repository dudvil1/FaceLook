const container = require('kontainer-di');


const http = require('http');
const app = require('./app');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");
const path = require('path');

