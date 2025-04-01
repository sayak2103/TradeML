import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  VictoryChart,
  VictoryCandlestick,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import './TradeWindow.css';

function TradeWindow() {
  const [data, setData] = useState([[]]);
  const [cap ,setCap] = useState(0);
  const [num_shares ,setNum_shares] = useState(0);
  const [profit ,setProfit] = useState(0);

  const [candleData , setCandleData] = useState([{}]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("connect_error", () => {
      setConnected(false);
      setError("Failed to connect to trading server");
    });

    socket.on("newData", (d) => {
      if (Array.isArray(d)) {
        const candleobj = {
          x : d[5],
          open : d[4],
          close : d[0],
          high : d[1],
          low : d[2]
        }
        setCandleData((prevcandleData) => {
          const updatedCandleData = [...prevcandleData, candleobj];
          return updatedCandleData;
        });
        setData((prevData) => [...prevData, d]);
        setCap(d[9]);
        setProfit(d[11]);
        setNum_shares(d[10]);
      }
    });

    return () => socket.disconnect();
  }, []);

  const formatData = (data) => {
    if (data.length <= 1 && data[0].length === 0) {
      return "Waiting for trading data...";
    }
    
    return JSON.stringify(data, null, 2);
  };

  return (
    <Box sx={{    }}>
      {!connected && !error && (
        <Box display="flex" alignItems="center" mb={2}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography variant="body2">Connecting to trading server...</Typography>
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ 
            flex: 7,
            p: 3, 
            borderRadius: 0, 
            bgcolor: "#1B2A41",
            borderRight: { md: '1px solid #112240' },
            width: '65vw'
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
              Performance Dashboard
            </Typography>
            <Box sx={{ 
              height: "400px", 
              bgcolor: "rgba(255,255,255,0.1)", 
              borderRadius: "4px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) =>
                      `Open: ${datum.open}\nClose: ${datum.close}\nHigh: ${datum.high}\nLow: ${datum.low}`
                    }
                    labelComponent={
                      <VictoryTooltip
                        cornerRadius={0}
                        flyoutStyle={{ fill: "#112240", stroke: "#00E676" }}
                        style={{ fill: "white" }}
                      />
                    }
                  />
                }
                width={800}
                height={350}
              >
                <VictoryAxis
                  style={{
                    axis: { stroke: "#00E676" },
                    tickLabels: { fill: "white" }
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: "#00E676" },
                    tickLabels: { fill: "white" }
                  }}
                />
                <VictoryCandlestick
                  candleColors={{ positive: "#00E676", negative: "#FF5252" }}
                  data={candleData}
                />
              </VictoryChart>
            </Box>
          </Paper>
      </motion.div>
      
      <Divider sx={{ my: 3 }} />
      
      {/*dashboard*/}
      <Paper elevation={3} sx={{ 
            flex: 3,
            p: 3, 
            borderRadius: 0, 
            bgcolor: "#1B2A41"
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
              Investment Overview
            </Typography>
            <Box sx={{ 
              height: "400px", 
              bgcolor: "rgba(255,255,255,0.1)", 
              borderRadius: "4px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "white" 
            }}>
              {/* Portfolio summary will be displayed here */}
              <ul>
                <li><b>Capital : </b> { cap } </li>
                <li><b>Number of Shares : </b> { num_shares } </li>
                <li><b>Profit : </b> { profit } </li>
              </ul>
            </Box>
          </Paper>
    </Box>
  );
}

export default TradeWindow;