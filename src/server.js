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
  socket.on('create-room', (roomName, callback) => {
    console.log(`create ${roomName} room!`)
    callback(roomName)
  })
})

// Run app 
httpServer.listen(3000, () => console.log('Start run httpServer'))