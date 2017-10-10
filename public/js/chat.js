var socket = io();


socket.on('connect', function(){                
    console.log('connected to the server');  
    
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log('no error');
        }
    });
    
});

function scrollToBottom(){
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = messages.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

function appendMessage(from, text, createdAt){
    var formatted = moment(createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from, text, createdAt: formatted
    });

    $('#messages').append(html);
    scrollToBottom();
}

socket.on('newMessage', function(msg){
    console.log('New message received.', msg);
    appendMessage(msg.from, msg.text, msg.createdAt, true);    
});

function appendLocationMessage(from, url, createdAt){
    
    var formatted = moment(createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from, url, createdAt: formatted
    });

    $('#messages').append(html);
    scrollToBottom();
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