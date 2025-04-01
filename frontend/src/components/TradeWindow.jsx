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

function TradeWindow() {
  const [data, setData] = useState([[]]);
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
        setData((prevData) => [...prevData, d]);
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Trading Logs
      </Typography>
      
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
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: 1,
            maxHeight: "400px",
            overflow: "auto",
            fontFamily: "monospace",
          }}
        >
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {formatData(data)}
          </pre>
        </Paper>
      </motion.div>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Trading Stats
      </Typography>
      
      <Box sx={{ opacity: data.length > 1 ? 1 : 0.5 }}>
        <Typography variant="body2">
          Total trades: {data.length > 1 ? data.length - 1 : 0}
        </Typography>
      </Box>
    </Box>
  );
}

export default TradeWindow;
