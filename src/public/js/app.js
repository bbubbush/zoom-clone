const socket = new WebSocket(`ws://${window.location.host}`)
socket.addEventListener("open", (message) => console.log("Connected to Server!"))
socket.addEventListener("message", (message) => {
  displayMessage(message.data)
})
socket.addEventListener("close", (message) => console.log("Disconnected to Server!"))

const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#chat');
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  const message = input.value;
  input.value = '';
  socket.send(makeMessage(message))
})

const displayMessage = (message) => {
  const liTag = document.createElement('li');
  liTag.innerText = message;
  messageList.appendChild(liTag)
}

const nicknameForm = document.querySelector('#nick');
nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = nicknameForm.querySelector('input');
  const nickname = input.value;
  input.value = '';
  socket.send(makeMessage(nickname, 'nickname'))
})

const makeMessage = (payload, type = 'message') => {
  const param = {
    payload,
    type,
  }
  return JSON.stringify(param);
}