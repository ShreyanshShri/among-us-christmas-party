// among us sound
const socket = io()
const username = prompt('Please Enter Your Name') || 'guest'

let user = {
    username,
    x: 20,
    y: 20,
    id : '',
    index: 0,
    isStanding: true,
    dir: 'right'
}

let curr_player = null

// create a new Player (curr_player) once the socket id is recieved
socket.on('sendId', ({ id }) => {
    user.id = id
    socket.emit('joinRoom', user)
    curr_player = new Player(user.x, user.y, user.dir, user.index, user.username, user.id)
    players.push(curr_player)
})

players = []

// create a new player whenever a user connects to server
socket.on('userJoined', (user) => {
    players.push(new Player(user.x, user.y, 'right', 0, user.username, user.id))
})

// alert('If you face any issues with scaling then zoom out your ')

// when any of player moves
socket.on('playerMoves', (users) => {
    // create and update new player array
    // definately not a great way of doing this but Ill fix this in future updates :)
    players = users.map(user => {
                const p =  new Player(user.x, user.y, user.dir, user.index, user.username, user.id)
                if(user.isStanding == false) {
                    p.isStanding = false
                }
                return p
            })
})
