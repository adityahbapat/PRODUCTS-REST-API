const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
// The requestListener is a function which is automatically 
// added to the 'request' event. createServer takes a function executed everytime we 
// here request works for get, post both
// reference video: https://www.youtube.com/watch?v=zoSJ3bNGPp0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=5

server.listen(port);