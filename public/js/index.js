var socket = io();


socket.on('connect', function(){                
    console.log('connected to the server');    
});

socket.on('newMessage', function(msg){
    console.log('New message received.', msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);
});

var user = {        
    set: (n)=>{
        this.name = n;
    },
    get: ()=>{
        return this.name;
    }
};

setUser = function(userName){
    user.set(userName);
    socket.emit('createUser', {userName: user.get()});        
};

sendMessage = function(text, uname){        
    if(user.get()){
        socket.emit('createMessage', {userName:user.get(),text}, function(data){
            console.log('got it', data);
        });
    }
    else{
        console.log(`Error: please set userName first!`);
    }
};

socket.on('disconnect', function(){    
    console.log('server disconnected');
});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var text = $('[name=message]').val();
    var uname = 'jQuery';
    socket.emit('createMessage', {userName: uname, text}, function(data){

    });
});
