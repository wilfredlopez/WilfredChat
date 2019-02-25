    //this is to emit an event
    socket.emit('newEmail',{
        from:"Wilfred@example.com",
        text:"hey, Whats Up?",
        createdAt: 123
    });

    //this is to Listen to en evernt
    socket.on('createEmail', (newEmail) =>{
        console.log("new Email", newEmail);
    });

        //emit event
        socket.emit('newMessage', {
            from:"Wilfred",
            message:"this is my message",
            createdAt: 123123
        });


socket.on('createMessage', (msg) =>{
            
            //emit the message to every connection with io (included the same user)
            io.emit('newMessage',{
                from: msg.from,
                message: msg.message,
                createdAt: new Date().getTime()
            });
        
        //emit the message to every connection with io (not including the same user)
        socket.broadcast.emit('newMessage',{
            from: msg.from,
            message: msg.message,
            createdAt: new Date().getTime()
        });


        
});



    //socket represents the browser connected. io represents the server
    socket.on('disconnect', () =>{
        console.log('disconected from server'); //this will  happen when a browser gets disconected
    });