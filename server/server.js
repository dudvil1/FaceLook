const container = require('./containerConfig')
const http = container.get('http');
const app = container.get('app');
const port = process.env.port || 3000;

const server = http.createServer(app);

const io = require('socket.io')(server);


server.listen(port, function () {
  console.log('Server run - listen port 3000...');
});

io.on("connection", socket => {
  socket.on('addPost', () => {
    console.log("hello")
    io.emit('hello', { message: 'hello' })
  });
  
  
 })



