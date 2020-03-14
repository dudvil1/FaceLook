const container = require('./containerConfig')
const http = container.get('http');


const app = container.get('app');
const port = process.env.port || 3000;


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

const server = http.createServer(app);

const io = require('socket.io')(server);

server.listen(port, function () {
  console.log('Server run - listen port 3000...');
});


let num = 0
io.on("connection", socket => {
  console.log(++num)
  
 })

