const http = require('http');
const app = require('./app');

const port = 4000;

const server = http.createServer(app);

server.listen(port);

// server.listen(3000, '192.168.100.10');