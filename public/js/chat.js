        //if user press enter on keyboard to submit form
        $msgInput = $(".value");
        $btnSend = $('#btn-send');


        $("input").keypress(function(event) {
                //handle if user press enter
                if (event.keyCode == 13){
                    event.preventDefault();
                    $btnSend.submit();
                  
                }
                    
            });



function scrollToBotton (){
    //selectors
    var messages = $('.messages');
    var newMessage = $('article li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};


var socket = io();
socket.on('connect', () =>{
     console.log('connected to server');

     var params = deparam(window.location.search); ///deparam is a custom function

     var $join = $('#join');
     
        socket.emit('join', params, function (err) {
                if(err){
                        alert(err);
                        window.location.href = '/'; //send user back to home
                        
                }else{
                    
                }
        });
 
  
    //handling event with query | getting data form Form
    $(document).ready(function(){

            //scroll function.


            
        var $form = $('#message-form');

    $form.on('submit', function(e){
        e.preventDefault();
      
        socket.emit('createMessage',{
            text: $('[name=message]').val()
        }, function(){

        });

        $('[name=message]').val("");   
        $(window).scrollTop(0);
        console.log('should scrool');
    });
    
    var $locationButton = $('#send-location');
    
    $locationButton.on('click', function(){
        if (!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }

        $locationButton.attr('disabled', 'disabled').text('Sending ...');

        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);

            $locationButton.removeAttr('disabled').text('Send Location');

            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function(){
            $locationButton.attr('disabled', 'disabled');
            alert('unable to fech location');
        });




    });

    socket.on('newLocationMessage', function(message){
            //removing aria-selected to old li elements
    var listas = $('.messages li');
    listas.removeAttr('aria-selected');


    var li = $('<li aria-selected="true" role="tab" tabindex="0" class="from"></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    a.attr('href', message.url);
    
    var messagediv = $('<div class="message"></div>');
    var tiempo = $('<span class="tiempo"></span>');
    var msgfrom = $('<span class="msgfrom"></span>');

   messagediv.append(a);

    tiempo.text(message.createdAt);
    msgfrom.text(`${message.from} `);

    li.append(msgfrom);
    li.append(tiempo);
    li.append(messagediv);

    $('.messages').append(li);
   // li.focus();
   scrollToBotton();
    $('.value').focus();


        /*
        var li = $('<li aria-selected="true" role="tab" tabindex="0"></li>');
        var a = $('<a target="_blank">My Current Location</a>');
    
        li.text(`${message.from}: `);
        a.attr('href', message.url);
        li.append(a);

        $('.messages').append(li);
        li.focus();
        $('.value').focus();
        */
    });
    


    }); //END DOCUMENT.READY



});

socket.on('disconnect', ()=> {
 console.log('disconnected form server');
});

socket.on('updateUserList', function(users){
   // console.log('Users array', users);
    //under div class users. have an ol li p
   
    var li = $('<li></li>'); 

        users[0].forEach(element => {
            li.append($('<p></p>').text(element));
        });

    $('#users-list').html(li);

//room name

let room = $('<h2>Room Name: </h2>');
let roomtitle = $('<span class="room"></span');
roomtitle.text(`${users[1]}`);
room.append(roomtitle);

$('#roomName').html(room);


});


//creating an event listener.
socket.on('newMessage', function(message){

    //removing aria-selected to old li elements
    var listas = $('.messages li');
    listas.removeAttr('aria-selected');


    var li = $('<li aria-selected="true" role="tab" tabindex="0" class="from"></li>');
    var messagediv = $('<div class="message"></div>');
    var tiempo = $('<span class="tiempo"></span>');
    var msgfrom = $('<span class="msgfrom"></span>');

    messagediv.text(message.text);
    tiempo.text(message.createdAt);
    msgfrom.text(`${message.from} `);

   li.append(msgfrom);
    li.append(tiempo);
    li.append(messagediv);

    $('.messages').append(li);
    //li.focus();
    scrollToBotton();
    $('.value').focus(); 

});






