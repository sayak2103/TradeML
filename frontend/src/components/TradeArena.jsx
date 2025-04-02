import { useState } from "react";
import QueryForm from "./QueryForm";
import TradeWindow from "./TradeWindow";
import { AppBar, Toolbar, Typography, Button, Alert, Box, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";

// Sample data format - replace with your actual data
const sampleCandleData = [
  { x: new Date(2023, 3, 1), open: 5, close: 9, high: 10, low: 3 },
  { x: new Date(2023, 3, 2), open: 9, close: 7, high: 10, low: 6 },
  { x: new Date(2023, 3, 3), open: 7, close: 8, high: 9, low: 5 },
  { x: new Date(2023, 3, 4), open: 8, close: 6, high: 9, low: 5 },
  { x: new Date(2023, 3, 5), open: 6, close: 8, high: 10, low: 4 },
];

function TradeArena() {
  const [formData, setFormData] = useState(null);
  const [candleData, setCandleData] = useState([]); // Replace with your actual data

  // Get the current time in hours and minutes
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  // Check if it's after 19:30
  const marketClosed = currentHour <= 19 || (currentHour === 19 && currentMinute >= 30);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: "#0A192F" }}>
      {/* Navbar - Tight spacing */}
      <AppBar position="static" sx={{ bgcolor: "#112240", boxShadow: 'none' }}>
        <Toolbar sx={{ minHeight: '48px' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            <Box component="span" sx={{ color: "white" }}>AutoTrade</Box>
            <Box component="span" sx={{ color: "#00E676" }}> | TradeArena</Box>
          </Typography>
          <Button color="inherit" sx={{ color: "white" }}>Portfolio</Button>
          <Button color="inherit" sx={{ color: "white" }}>History</Button>
          <Button color="inherit" sx={{ color: "white" }}>Settings</Button>
          <Button variant="contained" sx={{ bgcolor: "#00E676", color: "#0A192F" }}>Profile</Button>
        </Toolbar>
      </AppBar>

      {/* No gap between navbar and alert */}
      <Container maxWidth="xlg" sx={{ py: 0 }}>
        {/* NYSE Market Hours Alert - Only display after 19:30 */}
        {marketClosed && (
          <Alert severity="warning" sx={{ 
            bgcolor: "#ff9800", 
            color: "white",
            borderRadius: 0,
            '& .MuiAlert-message': { py: 1 }
          }}>
            <Typography fontWeight="bold" sx={{ color: "white" }}>NYSE Market Hours</Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              The New York Stock Exchange is currently closed. Market opens at 9:30 AM ET today.
            </Typography>
          </Alert>
        )}

        {/* Input Section - No title, tight spacing */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: 0, 
            bgcolor: "#1B2A41", 
            maxHeight: 200, 
            mx: "auto",
            mt: 0,
            mb: 0
          }}>
            <QueryForm setFormData={setFormData} />
          </Paper>
        </motion.div>

        {/* Trading Window - No extra spacing */}
        {formData && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              borderRadius: 0, 
              bgcolor: "#1B2A41",
              mt: 0 
            }}>
              <TradeWindow />
            </Paper>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

export default TradeArena;
