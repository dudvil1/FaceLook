module.exports = (nodeServices, defaultRoute, friendRoute, registrationRoute, socialRoute, loggerService) => {

  const { express, bodyParser, morgan, cors, path, swagger, yamljs } = nodeServices

  app = express();
  const swaggerDocument = yamljs.load('./swagger.yaml');

  app.use(cors());
  app.use(morgan("dev"));
  app.use(morgan('combined', { stream: loggerService.stream() }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
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

  // ROUTES
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use("/", defaultRoute);
  app.use("/registration", registrationRoute);
  app.use("/social", socialRoute);
  app.use("/friend", friendRoute);
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

  // ERROR HANDLING
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

  return app
} 
