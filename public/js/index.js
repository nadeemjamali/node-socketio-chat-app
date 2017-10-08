var socket = io();
var userName = undefined;

socket.on('connect', function(){    
    socket.on('newMessage', function(msg){
        console.log('New message received.', JSON.stringify(msg, undefined, 2));
    });
    
    socket.on('newUser', function(usr){
        console.log('New User joind the chat: ', JSON.stringify(usr, undefined, 2));
    });
    
    setUser = function(userName){
        userName = userName;        
        socket.emit('createUser', {userName});        
    }
    
    sendMessage = function(text){
        if(userName){
            socket.emit('createMessage', {userName,text});
        }
    };
    console.log('connected to the server');    
});

socket.on('disconnect', function(){    
    console.log('server disconnected');
});

