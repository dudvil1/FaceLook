const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://dudua:kfiH1cqKTmy90MjP@facelookclouster-epu8s.mongodb.net/test?retryWrites=true&w=majority`
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("db conncted!");
});

const registrationRoutes = require("./routes/registration");
const defaultRoutes = require("./routes/default"); 

const bodyParser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("header-interceptor: Start setting headers.");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    console.log("header-interceptor: ===OPTIONS.");
    var headers = {};
    headers["Access-Control-Allow-Methods"] =
      "POST, PATCH ,GET, PUT, DELETE, OPTIONS";
    res.writeHead(200, headers);
    res.end();
    console.log("header-interceptor: Headers set.");
  }
  next();
});
 
app.use("/", defaultRoutes);
app.use("/registration", registrationRoutes); 

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log("header-interceptor: error 500.");
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
