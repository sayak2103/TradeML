if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express = require("express");
const http = require('http');
const session = require("express-session");
const path = require("path");
const { Server } = require("socket.io");
const port = 8080;
const cors = require('cors');
const { json } = require("stream/consumers");
const { randomInt } = require("crypto");
// const axios = require("axios");
//const { duration } = require("@mui/material");
const app = express();
const server = http.createServer(app);

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET
    }
};
async function get_data(url , company){
    const response = await fetch(url, options)
    const json = await response.json();
    return json.bars[company]
}
async function getPrediction(state) {
    try {
        // const response = await axios.get('http://localhost:5000/predict', {
        //     params: { states: state }  
        // });
        // return response.data.prediction;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

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
        let url = `https://data.alpaca.markets/v2/stocks/bars/latest?symbols=${company}&feed=delayed_sip`;
        get_data(url , company).then((d) => {
            // 0-close | 1-high | 2-low | 3-n | 4-open | 5-time | 6-volume | 7-vol wt. price 
            let data = Object.values(d);
            pred = getPrediction(data);
            if(pred == 0)
                data.push("BUY")
            else if(pred == 1)
                data.push("HOLD")
            else
                data.push("SELL")
            socket.emit("newData", data);
        })
        if(time-- == 1){
            socket.emit("newData" , "TRADE FINISHED");
            clearInterval(interval);
        }
    }, 1000 * 2);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
