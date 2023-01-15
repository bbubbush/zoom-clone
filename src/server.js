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

const wss = new WebSocketServer({server});
wss.on("connection", (socket) => {
  console.log('Connected to Browser!')
  socket.on("close", () => console.log("Disconnected to Browser!"))
  socket.on("message", (message) => console.log(message.toString()))
  socket.send('Hello');
})

// Run app
server.listen(3000, () => console.log('Start run server'))