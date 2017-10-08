var socket = io();


socket.on('connect', function(){    
    socket.on('newMessage', function(msg){
        console.log('New message received.', JSON.stringify(msg, undefined, 2));
    });
    
    socket.on('newUser', function(usr){
        console.log('New User joind the chat: ', JSON.stringify(usr, undefined, 2));
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
    
    sendMessage = function(text){        
        if(user.get()){
            socket.emit('createMessage', {userName:user.get(),text});
        }
        else{
            console.log(`Error: please set userName first!`);
        }
    };
    console.log('connected to the server');    
});

socket.on('disconnect', function(){    
    console.log('server disconnected');
});

