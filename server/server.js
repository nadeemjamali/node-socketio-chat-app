const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utilities/message');
const {isRealString } = require('./utilities/validation');

const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected.');        
    
    socket.on('join',(params, callback)=>{

        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room are required.');
        }

        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    // socket.on('createUser', (user) => {
           
        
    //     // socket.broadcast.emit('newUser', {
    //     //     userName: usr.userName,
    //     //     joinedAt: new Date().getTime()
    //     // });
    // });
    
    socket.on('createMessage', (msg, callback)=>{        
        socket.broadcast.emit('newMessage', generateMessage(msg.userName,msg.text));        
        callback('This is from server');
    });
    
    socket.on('createLocationMessage', (coords)=>{        
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));        
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        });
        
});



server.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})

