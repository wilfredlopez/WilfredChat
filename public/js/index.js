
var socket = io();
socket.on('connect', () =>{
     console.log('connected to server');

    

    //handling event with query | getting data form Form
    $(document).ready(function(){

        var $form = $('#message-form');
    
        $form.on('submit', function(e){
            e.preventDefault();
            socket.emit('createMessage',{
                from: 'user',
                text: $('[name=message]').val()
            }, function(){
    
            });

            $('[name=message]').val("");
        });
    
    var $locationButton = $('#send-location');
    
    $locationButton.on('click', function(){
        if (!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function(){
            alert('unable to fech location');
        });


    });

    });



});

socket.on('disconnect', ()=> {
 console.log('disconnected form server');
});


//creating an event listener.
socket.on('newMessage', function(message){
    console.log('New Message: ', message);
    
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('.messages').append(li);
});






