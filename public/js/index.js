
var socket = io();
socket.on('connect', () =>{
     console.log('connected to server');

     //EMITING EVENT
    socket.emit('createEmail',{
        to:"wilfred@example.com",
        text:"hi, this is my email"
    });

    socket.emit('createMessage', {
        from: "Wilfred-chrome",
        message:"Im sending from browser"
    });

});

socket.on('disconnect', ()=> {
 console.log('disconnected form server');
});


//creating an event listener. i give the name e.g. newEmail
socket.on('newEmail', function(email){
    console.log('new Email',email);
});

socket.on('newMessage', function(msg){
    console.log('New Message: ', msg);
});