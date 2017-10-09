const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utilities/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected.');        
    
    socket.on('createUser', (user) => {
           
        socket.broadcast.emit('newMessage', generateMessage('Admin',`${user.userName} joined the chat.`));
        // socket.broadcast.emit('newUser', {
        //     userName: usr.userName,
        //     joinedAt: new Date().getTime()
        // });
    });
    
    socket.on('createMessage', (msg, callback)=>{        
        socket.broadcast.emit('newMessage', generateMessage(msg.userName,msg.text));        
        callback('This is from server');
    });
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        });
        
});



server.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})

