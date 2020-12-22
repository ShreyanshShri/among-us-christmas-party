// helper functions
const $ = function (query) {
    return document.querySelector(query)
}
const movePlayer = (dir) => {
    curr_player.move(dir)
    socket.emit('movePlayer', curr_player)
}

// add multiple event listeners at same time function
const $e = (el, events, func) => {
    const eventsArr = events.split(' ')
    eventsArr.forEach(ev => {
        el.addEventListener(ev, func)
    })
}

const audio = new Audio('../audio/background_music.mp3')
// playing bg music
$('body').addEventListener('click', () => {
    audio.play()
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
    audio.play()
}

let upTimeout = 0
$e( $('.up-arrow'),
     'mousedown touchstart',
      function() {
        upTimeout = setInterval(function() {
            movePlayer('up')
        }, 35)    
      }
)

$e( $('.up-arrow'),
    'mouseup mouseleave touchend',
    function(){
        clearTimeout(upTimeout)
    }
)

let downTimeout = 0
$e( $('.down-arrow'),
     'mousedown touchstart',
      function() {
         downTimeout = setInterval(function() {
            movePlayer('down')
        }, 35)    
      }
)
$e( $('.down-arrow'),
    'mouseup mouseleave touchend',
    function(){
        clearTimeout(downTimeout)
    }
)

let leftTimeout = 0
$e( $('.left-arrow'),
     'mousedown touchstart',
      function() {
        leftTimeout = setInterval(function() {
            movePlayer('left')
        }, 35)
      }
)

$e( $('.left-arrow'),
    'mouseup mouseleave touchend',
    function(){
        clearTimeout(leftTimeout)
    }
)

let rightTimeout = 0
$e( $('.right-arrow'),
     'mousedown touchstart',
      function() {
        rightTimeout = setInterval(function() {
            movePlayer('right')
        }, 35)    
      }
)

$e( $('.right-arrow'),
    'mouseup mouseleave touchend',
    function(){
        clearTimeout(rightTimeout)
    }
)