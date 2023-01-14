import path from 'path';
import express from "express";
const __dirname = path.resolve();

const app = express();
app.set("view engine", "pug")
app.set("views", __dirname + "/src/views")
app.use("/public", express.static(__dirname + "/src/public"))
//console.log(express) 
app.get("/", (req, res) => res.render("home"))


console.log('hello');

app.listen(3000, () => console.log('Listen!'))