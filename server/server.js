const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public'); //to use public path
const {generateMessage} = require('./utils/message');

//setting Web Sockets
const socketIO = require('socket.io');
const http = require('http');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// to use public folder
app.use(express.static(publicPath));

//INDEX PAGE
app.get('/', (req, res) =>{
    res.render('/index.html');
});

//PORT CONFIG
server.listen(process.env.PORT || 3000, () =>{
    console.log("listening on port", process.env.PORT || 3000);
});

//helps cominication // listen and emitting events
io.on('connection', (socket) =>{

    //greeting user
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));
    
    //listen to event
    socket.on('createMessage', (message) =>{
        console.log('message from brower received: ', message);
        io.emit('newMessage', generateMessage(message.from,message.text));

    });
});//END CONNECTION







