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
