const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, './../public'); //to use public path
const {generateMessage, generateLocationMessage} = require('./utils/message');
const moment = require('moment'); //to handle time forma and display
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

//handlebars
var hbs = require('hbs');

//setting Web Sockets
const socketIO = require('socket.io');
const http = require('http');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// to use public folder
app.use(express.static(publicPath));

//CREATING PUBLIC/STATIC FOLDER AND PARTIAL FOLDERS
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/../views/partials');


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

app.get('/chat', (req, res) =>{
    res.render('chat.hbs',{
        pageTitle: 'Home | Chat App',
    }); //using hbs package
});

//PORT CONFIG
server.listen(process.env.PORT || 3000, () =>{
    console.log("listening on port", process.env.PORT || 3000);
});

//helps cominication // listen and emitting events
io.on('connection', (socket) =>{
    //tiempo = moment().format("MMM Do YYYY h:mm a z");
    tiempo = moment().format("h:mm a z"); //z is for the timezone
 

   hbs.registerHelper('from',() =>{
    return 'Admin'
});
hbs.registerHelper('text',() =>{
    return 'Welcome to the Chat'
});
hbs.registerHelper('createdAt',() =>{
    return tiempo
});
 
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){     
            return callback(`Name and Room are required: invalid: ${JSON.stringify(params.name)} / ${JSON.stringify(params.room)}`);
        }
          
        
       socket.join(params.room.toUpperCase()); // to join that particular room
       users.removeUser(socket.id);
       users.addUser(socket.id, params.name, params.room.toUpperCase());


       io.to(params.room.toUpperCase()).emit('updateUserList', [users.getUserList(params.room.toUpperCase()),params.room]);
        //greeting user
        var user = users.getUser(socket.id);
        socket.emit('newMessage', generateMessage('Admin',`Welcome to the chat ${user.name}`,`${tiempo}:`));
        socket.broadcast.to(params.room.toUpperCase()).emit('newMessage',generateMessage('Admin',`${params.name} has joined`,`${tiempo}:`));
        
        callback();
    });

    //listen to event
    socket.on('createMessage', (message, callback) =>{
        var user = users.getUser(socket.id);
       
        if(user){
        io.to(user.room.toUpperCase()).emit('newMessage', generateMessage(user.name,message.text,`${tiempo}:`));
        }
        callback('from server');
    });

    socket.on('createLocationMessage', (coords) =>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room.toUpperCase()).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude, `${tiempo}:`));
        }
    });

    socket.on('disconnect', () =>{
        var user = users.removeUser(socket.id);
         if(user){
             io.to(user.room.toUpperCase()).emit('updateUserList', users.getUserList(user.room.toUpperCase()));
             io.to(user.room.toUpperCase()).emit('newMessage', generateMessage('Admin', `${user.name} has left`,`${tiempo}:`));
         }
     });



});//END CONNECTION







