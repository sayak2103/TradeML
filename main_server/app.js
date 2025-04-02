if (process.env.NODE_ENV != "production") {
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
var pred;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET
    }
};
async function get_data(url, company) {
    const response = await fetch(url, options)
    //console.log(response.status)
    const json = await response.json();
    return json.bars[company]
}
async function getPrediction(d) {
    url = `http://localhost:5000/predict`

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        })
            .then(res => res.json())
            .then(json => {
                pred = json['prediction']
            });
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
let cap = 0;
let profit = 0;
let num_shares = 0;
let total_cost = 0;
app.post('/trade', (req, res) => {
    company = req.body.company;
    time = req.body.duration;
    cap = req.body.capital;
    profit = num_shares = total_cost = 0;
    res.json({ message: 'data received' });
});

io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    //console.log(`request recieved : C ${company} , D: ${time}`);

    const interval = setInterval(() => {
        let url = `https://data.alpaca.markets/v2/stocks/bars/latest?symbols=${company}&feed=delayed_sip`;
        get_data(url, company).then((d) => {
            // 0-close | 1-high | 2-low | 3-n | 4-open | 5-time | 6-volume | 7-vol wt. price 
            let data = Object.values(d);
            getPrediction(data);
            if (pred == '0') {
                if (data[0] <= cap) {
                    cap -= data[0]
                    data.push("BUY")
                    num_shares++;
                    total_cost += data[0];
                }
                else {
                    data.push("BUY -> aborted")
                }
            }
            else if (pred == '1')
                data.push("HOLD")
            else {
                if (num_shares > 0) {
                    let SP = num_shares * data[0];
                    cap += SP
                    // CP = total_cost
                    let change = SP - total_cost;
                    profit += change
                    num_shares = 0
                    total_cost = 0
                    asset = 0
                    data.push("SELL")
                }
                else {
                    data.push("SELL -> aborted")
                }
            }
            var curret_investment =num_shares * data[0]
            data.push(cap)
            data.push(num_shares)
            data.push(profit)
            data.push(total_cost)
            data.push(curret_investment)
            var asset = cap + curret_investment
            data.push(asset)
            socket.emit("newData", data);
        })
        if (time-- == 1) {
            socket.emit("newData", "TRADE FINISHED");
            clearInterval(interval);
        }
    }, 1000 * 60);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
