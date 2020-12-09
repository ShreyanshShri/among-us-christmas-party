// import stuff
const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)
const io = socketio(server)

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllUsers,
  } = require('./utils/user')

// declare static files path
app.use(express.static('./views'))

// once socket connected
io.on('connection', socket => {
    // send socket id 
      socket.emit("sendId", {id: socket.id})

    // join user to a room when it connects to server
    socket.on('joinRoom', async (user) => {
        // create and join the user
        userJoin(user)
        socket.broadcast.emit('userJoined', user)
        io.emit('playerMoves', getAllUsers())
        // when any of player moves
        socket.on('movePlayer', (player) => {
          // get the user and update it
          let user = getCurrentUser(player.id)
          user.x = player.x
          user.y = player.y
          user.index = player.index
          user.isStanding = player.isStanding
          user.dir = player.dir
          const allUsers = getAllUsers()
          // send updated array back to all clients
          io.emit('playerMoves', allUsers)
          user.index = 0
        })

        // when a user sends msg
        socket.on('send-msg', (msg) => {
          // send exact msg to everyone
          io.emit('recieve-msg', msg)
        })
    })
    // user disconnects (or closes the tab)
    socket.on('disconnect', () => {
      // update server-side user array (check utils/user file)
      userLeave(socket.id)
    })
})

// serve html js files
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

// run the server
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))