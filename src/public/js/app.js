const socket = new WebSocket(`ws://${window.location.host}`)
socket.addEventListener("open", (message) => console.log("Connected to Server!"))
socket.addEventListener("message", (message) => console.log(message.data))
socket.addEventListener("close", (message) => console.log("Disconnected to Server!"))

setTimeout(() => {
  socket.send("안녕하세요");
}, 1000)