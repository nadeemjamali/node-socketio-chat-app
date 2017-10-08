const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected.');        
    
    socket.on('createUser', (usr) => {
        console.log('new user requested join: ', usr);        
        
    
        io.emit('newUser', {
            userName: usr.userName,
            joinedAt: new Date().getTime()
        });
    });
    
    socket.on('createMessage', (msg)=>{
        console.log('new message created by:', msg);
        
        io.emit('newMessage', {
            from: msg.userName,
            text: msg.text,
            createdAt: new Date().getTime()
        });
    });
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        });
        
});



server.listen(PORT, ()=>{
    console.log(`Listing on port ${PORT}`);
})

