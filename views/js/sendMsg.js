// listen for btn click event
document.querySelector('.send-btn').addEventListener('click', (e) => {
    // gett the value from inputbox
    let msg = document.querySelector('#chat-inp').value
    // send username and msg to server
    socket.emit('send-msg', {msg: msg, username: user.username})
    // clear inputbox
    document.querySelector('#chat-inp').value = ''
})

// recieve msg form server
socket.on('recieve-msg', ({msg, username}) => {
    // create element and fill all the important details
    const el = document.createElement('div')
    el.innerHTML = `
        <span>${username}</span>
        <p class='message'>${msg}</p>
        <hr>
    `
    el.style.marginTop = '10px'
    el.style.padding = '5px'
    // append msg to msg-box
    const msgBox = document.querySelector('.msgs')
    msgBox.appendChild(el)
    msgBox.scrollTop = msgBox.scrollHeight
})