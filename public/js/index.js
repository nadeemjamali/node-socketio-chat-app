var socket = io();


socket.on('connect', function(){                
    console.log('connected to the server');    
});

function appendMessage(from, text, isLeft){
    var li = $('<li></li>');
    li.text(`${from}: ${text}`);
    if(isLeft === true){
        li.addClass('blueText');
    }else{
        li.addClass('redText');
    }

    $('#messages').append(li);
}

socket.on('newMessage', function(msg){
    console.log('New message received.', msg);
    appendMessage(msg.from, msg.text, true);    
});

function appendLocationMessage(from, url){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    a.attr('href',url);
    li.text(`${from} `);        
    li.append(a);
    li.addClass('blueText');
    $('#messages').append(li);
}


socket.on('newLocationMessage', function(msg){
    console.log('New message received.', msg);
    appendLocationMessage(msg.from, msg.url);    
});


socket.on('disconnect', function(){    
    console.log('server disconnected');
});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var text = $('[name=message]').val();
    var uname = $('#txt-user-name').val();
    socket.emit('createMessage', {userName: uname, text}, function(data){
        appendMessage('You', text);
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not found');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(err){
        console.log('Unable to fetch the geo location');
    });
});