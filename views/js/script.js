const socket = io()
const username = prompt('Please Enter Your Name')

let user = {
    username,
    x: 20,
    y: 20,
    id : ''
}

let curr_player = null

// create a new Player (curr_player) once the socket id is recieved
socket.on('sendId', ({ id }) => {
    user.id = id
    socket.emit('joinRoom', user)
    curr_player = new Player(user.x, user.y, 'right', 0, user.username, user.id)
    players.push(curr_player)
})

players = []

// create a new player whenever a user connects to server
socket.on('userJoined', (user) => {
    players.push(new Player(user.x, user.y, 'right', 0, user.username, user.id))
})

// when any of player moves
socket.on('playerMoves', (users) => {
    // create and update new player array
    players = users.map(user => {
                const p =  new Player(user.x, user.y, user.dir, user.index, user.username, user.id)
                if(user.isStanding == false) {
                    p.isStanding = false
                }
                return p
            })
})

// move current player
document.onkeydown = function (event) {
    if (event.keyCode == 37) {
        curr_player.move('left')
        // send data to server that curr_player has moved
        socket.emit('movePlayer', curr_player)
    } else if (event.keyCode == 38) {
        curr_player.move('up')
        socket.emit('movePlayer', curr_player)
    } else if (event.keyCode == 39) {
        curr_player.move('right')
        socket.emit('movePlayer', curr_player)
    } else if (event.keyCode == 40) {
        curr_player.move('down')
        socket.emit('movePlayer', curr_player)
    }
}

const $ = function (query) {
    return document.querySelector(query)
}

$('.up-arrow').addEventListener('click', () => {
    curr_player.move('up')
    socket.emit('movePlayer', curr_player)
})
$('.down-arrow').addEventListener('click', () => {
    curr_player.move('down')
    socket.emit('movePlayer', curr_player)
})
$('.left-arrow').addEventListener('click', () => {
    curr_player.move('left')
    socket.emit('movePlayer', curr_player)
})
$('.right-arrow').addEventListener('click', () => {
    curr_player.move('right')
    socket.emit('movePlayer', curr_player)
})