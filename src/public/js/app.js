const socket = io();

const welcomeDiv = document.querySelector('#welcome')
const createRoomForm = welcomeDiv.querySelector('#createRoom')
const roomDiv = document.querySelector('#room')
roomDiv.hidden = true;

createRoomForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const roomName = createRoomForm.querySelector('#roomName').value;
  const nickname = createRoomForm.querySelector('#nickname').value;
  socket.emit('create-room', roomName, nickname, () => {
    roomDiv.hidden = false
    welcomeDiv.hidden = true
    const roomTitle = roomDiv.querySelector('h3')
    roomTitle.innerText = `Room ${roomName}`

    const roomForm = roomDiv.querySelector('form')
    roomForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const textInput = roomDiv.querySelector('input')
      const text = textInput.value
      socket.emit('new-message', text, roomName, () => {
        createMessageTag(`You: ${text}`)
      })
      textInput.value = '';
    })

  })
})

const createMessageTag = (message) => {
  const messageList = roomDiv.querySelector('ul')
  const liTag = document.createElement('li')
  liTag.innerHTML = message
  messageList.appendChild(liTag)
}

socket.on('welcome', (nickname) => {
  createMessageTag(`${nickname}이 참가했습니다.`)
})
socket.on('bye', (nickname) => {  
  createMessageTag(`${nickname}이 떠났습니다.`)
})
socket.on('new-message', createMessageTag)