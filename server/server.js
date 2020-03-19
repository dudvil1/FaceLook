const container = require('./containerConfig')
const http = container.get('http');
const app = container.get('app');
const logger = container.get('loggerService');
const dbManager = container.get('dbManager');
const port = process.env.port || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port, function () {
  console.log('Server run - listen port 3000...');
  logger.info('test');
});

io.on("connection", socket => {
  socket.on('addPost', () => {
    dbManager.getAllPosts((posts) => {
      socket.broadcast.emit('addPostChange', posts)
    })
  });
  
  socket.on('updateLike', (post) => {
    socket.broadcast.emit('updateLikeChange', post)
  });
})

