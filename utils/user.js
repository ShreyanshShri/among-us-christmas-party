// copied form https://github.com/bradtraversy/chatcord/blob/master/utils/users.js

const users = []

// Join user to chat
function userJoin(user) {
  users.push(user)
  return user
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id)
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

function getAllUsers() {
  return users
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room)
}

// export functions
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUsers
}