const container = require('./containerConfig')
const http = container.get('http');
const app = container.get('app');
const logger = container.get('loggerService');
const socketService = container.get('socketService');
const port = process.env.port || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);
const filename = __filename.slice(__dirname.length + 1);

server.listen(port, function () {
   logger.info(`server listening in port: ${port}`, { location: filename}); 
});

io.on("connection", socket => {
  socketService(socket)
})

module.exports = server;
