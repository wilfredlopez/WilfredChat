const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, './../public'); //to use public path
const {generateMessage, generateLocationMessage} = require('./utils/message');
const moment = require('moment'); //to handle time forma and display

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



app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About | Chat App',
    }); //using hbs package
});

app.get('/', (req, res) =>{
    res.render('home.hbs',{
        pageTitle: 'Home | Chat App',
    }); //using hbs package
});



//PORT CONFIG
server.listen(process.env.PORT || 3000, () =>{
    console.log("listening on port", process.env.PORT || 3000);
});

//helps cominication // listen and emitting events
io.on('connection', (socket) =>{

    tiempo = moment().format("MMM Do YYYY h:mm a");

    
    //greeting user
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat',tiempo));

    //var hora = new Date().getTime().valueOf;
    
  

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined',tiempo));
    
    //listen to event
    socket.on('createMessage', (message, callback) =>{
        io.emit('newMessage', generateMessage(message.from,message.text,tiempo));
        callback('from server');
    });

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Location', coords.latitude, coords.longitude));
    });


});//END CONNECTION







