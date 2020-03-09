const container = require('./containerConfig')
const http = container.get('http');

const app = container.get('app');
// const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port, function () {
    console.log('Server run - listen port 3000...');
  });
