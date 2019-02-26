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


//handlebars
var hbs = require('hbs');


//CREATING PUBLIC/STATIC FOLDER AND PARTIAL FOLDERS
hbs.registerPartials(__dirname + './../views/partials');
app.set('view engine', 'hbs');



// to use public folder
app.use(express.static(publicPath));

//INDEX PAGE
app.get('/', (req, res) =>{
    res.render('/index.hbs');
});

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About | Chat App',
    }); //using hbs package
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
    socket.on('createMessage', (message, callback) =>{
        console.log('message from brower received: ', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback('from server');
    });

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newMessage', generateMessage('Location', `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`));
    });


});//END CONNECTION







