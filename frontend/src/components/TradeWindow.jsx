import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  VictoryChart,
  VictoryCandlestick,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

function TradeWindow() {
  const [data, setData] = useState([[]]);
  const [cap, setCap] = useState(0);
  const [num_shares, setNum_shares] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total_invested, setTotal_invested] = useState(0);
  const [current_investment, setCurrent_investment] = useState(0);
  const [total_asset, setTotal_asset] = useState(0);
  const [action, setAction] = useState("");

  const [candleData, setCandleData] = useState([{}]);
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
          x: d[5],
          open: d[4],
          close: d[0],
          high: d[1],
          low: d[2],
        };
        setCandleData((prevcandleData) => [...prevcandleData, candleobj]);
        setData((prevData) => [...prevData, d]);
        setAction(d[8]);
        setCap(d[9].toFixed(3));
        setProfit(d[11].toFixed(2));
        setNum_shares(d[10]);
        setTotal_invested(d[12].toFixed(3));
        setCurrent_investment(d[13].toFixed(3));
        setTotal_asset(d[14].toFixed(3));
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
    <Box sx={{
      display: 'flex'
    }}>
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
            flex: 7,
            height: "400px",
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
            // display: "flex", 
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

      {/* Investment Overview */}
      <Paper elevation={3} sx={{  display:"flex", flexDirection:"column", justifyContent:"space-between", p: 3, borderRadius: 0, bgcolor: "#1B2A41" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
          Investment Overview
        </Typography>
        <Box >
          <Grid sx={{ p: 2, display:"flex", flexDirection:"column", justifyContent:"space-between" }} container spacing={2}>
            {/* Capital */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Capital</Typography>
                <Typography variant="h6" sx={{color: cap >= 0 ? "#00E676" : "#FF5252" }}>{cap}</Typography>
              </Card>
            </Grid>

            {/* Number of Shares */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Number of Shares</Typography>
                <Typography variant="h6" sx={{color: num_shares >= 0 ? "#00E676" : "#FF5252" }}>{num_shares}</Typography>
              </Card>
            </Grid>

            {/* Profit */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Profit</Typography>
                <Typography variant="h6" sx={{ color: profit >= 0 ? "#00E676" : "#FF5252" }}>{profit}</Typography>
              </Card>
            </Grid>

            {/* Total Investment */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Total Investment</Typography>
                <Typography variant="h6" sx={{color: total_invested >= 0 ? "#00E676" : "#FF5252" }}>{total_invested}</Typography>
              </Card>
            </Grid>

            {/* Current Investment */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Current Investment</Typography>
                <Typography variant="h6" sx={{ color: current_investment >= 0 ? "#00E676" : "#FF5252" }}>{current_investment}</Typography>
              </Card>
            </Grid>

            {/* Total Asset */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Total Asset</Typography>
                <Typography variant="h6" sx={{ color: total_asset >= 0 ? "#00E676" : "#FF5252"  }}>{total_asset}</Typography>
              </Card>
            </Grid>

            {/* Action */}
            <Grid item xs={12}>
              <Card sx={{ bgcolor: "#112240", color: "white", p: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Action   </Typography>
                <Typography variant="h6" sx={{ color: "#00E676" }}>{action}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

      </Paper>
    </Box>
  );
}

export default TradeWindow;
