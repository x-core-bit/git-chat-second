
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Script } = require('vm');

const DScript = fs.readFileSync( path.join(__dirname, 'static', 'script.js'));
const Style = fs.readFileSync( path.join(__dirname, 'static', 'style.css'));
const index = fs.readFileSync( path.join(__dirname, 'static', 'index.html'));
const picture = fs.readFileSync( path.join(__dirname, 'static', 'background', 'picture.jpg'));


const server = http.createServer((req, res) => {
 
  switch (req.url) {
    case '/': return res.end(index);
    case '/script.js':
        res.setHeader('Content-Type', 'application/javascript');
        return res.end(DScript);
    case '/style.css':
        res.setHeader('Content-Type', 'text/css');
        return res.end(Style);
    case '/background/picture.jpg':
        res.setHeader('Content-Type', 'image/jpeg');
        return res.end(picture);

  }

  res.statusCode = 404
  return res.end('Error 404');
})

server.listen(3000);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected id -' + socket.id);
  let userNickname = 'user';

  socket.on('set_nikname', (nickname) => {
    userNickname = nickname;
  });

socket.on('new_message', (message) => {
  io.emit('message'< userNickname + ' : ' + message)
});

});
