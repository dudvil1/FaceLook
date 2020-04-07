require('./containerConfig')().then(
  container => {
    const { http } = container.get('nodeServices');
    const app = container.get('app');
    const logger = container.get('loggerService');
    const socketService = container.get('socketService');
    const port = process.env.port || 3000;
    const server = http.createServer(app);
    const io = require('socket.io')(server);

    server.listen(port, function () {
      logger.info('kjhlkjlkj', { location: __filename, data: { port, function: 'server.listen' } });
    });

    io.on("connection", socket => {
      socketService(socket)
    })
  }
)
// const http = container.get('http');
// const app = container.get('app');
// const logger = container.get('loggerService');
// const socketService = container.get('socketService');
// const port = process.env.port || 3000;
// const server = http.createServer(app);
// const io = require('socket.io')(server);

// server.listen(port, function () {
//   logger.info('kjhlkjlkj', { location: __filename, data: { port, function: 'server.listen' } });
// });

// io.on("connection", socket => {
//  socketService(socket)
// })

