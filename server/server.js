const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public'); //to use public path

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
   // console.log('new User connection');

    //socket represents the browser connected. io represents the server
    socket.on('disconnect', () =>{
        console.log('disconected from server'); //this will  happen when a browser gets disconected
    });

    /*
    //emit event
    socket.emit('newMessage', {
        from:"Wilfred",
        message:"this is my message",
        createdAt: 123123
    });
    */

    //listen to event
    socket.on('createMessage', (msg) =>{
        console.log('message from brower received: ', msg);
        
    //greeting user
    socket.emit('newMessage', {
        from: 'admin',
        message: "Welcome to the App",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'admin',
        message: 'new user Joined',
        createdAt: new Date().getTime()
    });
    
    
    });
});//END CONNECTION







