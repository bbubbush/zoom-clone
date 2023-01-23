const socket = io();

const welcomeDiv = document.querySelector('#welcome')
const createRoomForm = welcomeDiv.querySelector('#createRoom')
createRoomForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const roomName = createRoomForm.querySelector('input').value;
  socket.emit('create-room', roomName, (msg) => {
    console.log('create room callback ' + msg);
  })
})