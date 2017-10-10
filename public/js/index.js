var socket = io();


socket.on('connect', function(){                
    console.log('connected to the server');    
});

function appendMessage(from, text, createdAt, isLeft){
    var li = $('<li></li>');
    var formatted = moment(createdAt).format('h:mm a');
    li.text(`${from}, ${formatted} : ${text}`);
    if(isLeft === true){
        li.addClass('blueText');
    }else{
        li.addClass('redText');
    }

    $('#messages').append(li);
}

socket.on('newMessage', function(msg){
    console.log('New message received.', msg);
    appendMessage(msg.from, msg.text, msg.createdAt, true);    
});

function appendLocationMessage(from, url, createdAt){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    a.attr('href',url);
    var formatted = moment(createdAt).format('h:mm a');
    li.text(`${from}, ${formatted} : `);        
    li.append(a);
    li.addClass('blueText');
    $('#messages').append(li);
}


socket.on('newLocationMessage', function(msg){
    console.log('New message received.', msg);
    appendLocationMessage(msg.from, msg.url, msg.createdAt);    
});


socket.on('disconnect', function(){    
    console.log('server disconnected');
});

$('#message-form').on('submit', function(e){
    e.preventDefault();

    var text = $('[name=message]').val();
    var uname = 'User';
    socket.emit('createMessage', {userName: uname, text}, function(data){
        appendMessage('You', text, data.createdAt);
        $('[name=message]').val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not found');
    }
    locationButton.attr('disabled', 'disabled').text('sending locatin...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(err){
        locationButton.removeAttr('disabled').text('Send Location');
        console.log('Unable to fetch the geo location');
    });
});