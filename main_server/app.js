require('dot-env');
const express = require("express");
const http = require('http');
const session = require("express-session");
const path = require("path");
const { Server } = require("socket.io");
const port = 8080;
const cors = require('cors');
const { json } = require("stream/consumers");
const { duration } = require("@mui/material");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust according to your frontend port
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

let company = "";
let time = 0;
app.post('/trade' , (req,res)=>{
    company = req.body.company
    time = req.body.duration
    res.json({message : 'data received'});
});

io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    //console.log(`request recieved : C ${company} , D: ${time}`);

    const interval = setInterval(() => {
        const dateTime = new Date().toLocaleString();
        socket.emit("dateTime", { dateTime });
    }, 1000);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
