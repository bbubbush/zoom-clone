import http from "http";
import {WebSocketServer} from "ws";
import path from "path";
import express from "express";
const __dirname = path.resolve();

const app = express();
app.set("view engine", "pug")
app.set("views", __dirname + "/src/views")
app.use("/public", express.static(__dirname + "/src/public"))

// View resolver
app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.render("/"))

const server = http.createServer(app);

// Chat feature
const connectedSockets = []
const wss = new WebSocketServer({server});
wss.on("connection", (socket) => {
  socket.nickname = '익명'
  connectedSockets.push(socket);
  console.log('Connected to Browser!')
  socket.on("close", () => console.log("Disconnected to Browser!"))
  socket.on("message", (msg) => {
    const message = JSON.parse(msg)
    if (message.type == 'nickname') {
      socket.nickname = message.payload
      return;
    }
    if (message.type == 'message') {
      connectedSockets.forEach(aSocket => {
        aSocket.send(`${socket.nickname}:: ${message.payload}`)
      })
      return;
    }
  })
})

// Run app
server.listen(3000, () => console.log('Start run server'))