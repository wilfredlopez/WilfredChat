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
        var li = $('<li aria-selected="true" role="tab" tabindex="0"></li>');
        var a = $('<a target="_blank">My Current Location</a>');
    
        li.text(`${message.from}: `);
        a.attr('href', message.url);
        li.append(a);

        $('.messages').append(li);
        li.focus();
        $('.value').focus();
    });
    



    }); //END DOCUMENT.READY



});

socket.on('disconnect', ()=> {
 console.log('disconnected form server');
});


//creating an event listener.
socket.on('newMessage', function(message){
    //MUSTAGEJS WAY
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt : message.createdAt
    });
    
    $('.messages').append(html);

   /*           //OLD WAY TO DO IT
    var li = $('<li aria-selected="true" role="tab" tabindex="0" class="from"></li>');
    var span = $('<span class="message"></span>');
    span.text(`${message.text}`);
    li.text(`${message.createdAt} ${message.from}: `);

    li.append(span);

    $('.messages').append(li);
    li.focus();
    $('.value').focus();
*/
});






