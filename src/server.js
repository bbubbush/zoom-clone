import http from "http";
// import {WebSocke httpServer} from "ws";
import { Server } from "socket.io";
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

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);
wsServer.on("connection", socket => {
  socket['nickname'] = '익명'
  socket.on('create-room', (roomName, nickname, callback) => {
    socket['nickname'] = nickname
    socket.join(roomName);
    callback(roomName)
    socket.to(roomName).emit('welcome', socket['nickname'])
  })
  socket.on('disconnecting', () => {
    socket.rooms.forEach(roomName => socket.to(roomName).emit('bye', socket['nickname']))
  })
  socket.on('new-message', (msg, roomName, callback) => {
    socket.to(roomName).emit('new-message', `${socket['nickname']}: ${msg}`)
    callback()
  })
  
})

// Run app 
httpServer.listen(3000, () => console.log('Start run httpServer'))