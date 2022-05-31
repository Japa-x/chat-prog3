const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    const count = io.engine.clientsCount;
    console.log("Pessoas logadas " + count)
    socket.on('msg', (msg) => io.emit('msg', { 'user': socket.user, 'msg': msg }))

    socket.on('join', (user) => {
        if(user != null){
            socket.user = user

            function imprimir(user) {
                user.forEach((user => {
                    console.log(user);
                    io.emit('users', socket.user ) 
                }))
            }

            users = [socket.user]
        
            imprimir(users)
        }
        socket.broadcast.emit('msg', { user: 'servidor', 'msg': socket.user + ' entrou !' } )
    })

    socket.on('jointo', (userfinal, users) => {
        users.forEach(user => {
            if(user == socket.user){
                io.to(socket.id).emit('newUser');
            }
        })
    })

})