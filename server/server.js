const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utilities/message');
const {isRealString } = require('./utilities/validation');
const {Users} = require('./utilities/users');

const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
var users = new Users();

io.on('connection', (socket)=>{
    console.log('new user connected.');        
    
    socket.on('join',(params, callback)=>{

        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);        

        io.to(params.room).emit('updateUserList', users.getAllUsers(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    
    socket.on('createMessage', (msg, callback)=>{        
        var user = users.getUser(socket.id);
        if(user && isRealString(msg.text)){
            socket.to(user.room).broadcast.emit('newMessage', generateMessage(user.name,msg.text));        
            callback('This is from server');
        }
        
    });
    
    socket.on('createLocationMessage', (coords)=>{       
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude));        
        }
        
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getAllUsers(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
        }
        });
        
});



server.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})

