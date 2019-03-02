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
    }else{
        console.log('should NOT scroll');
    }
};


var socket = io();
socket.on('connect', () =>{
     console.log('connected to server');

    

    //handling event with query | getting data form Form
    $(document).ready(function(){

            //scroll function.
            





        var $form = $('#message-form');

        $form.on('submit', function(e){
            e.preventDefault();
            socket.emit('createMessage',{
                from: 'User',
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






