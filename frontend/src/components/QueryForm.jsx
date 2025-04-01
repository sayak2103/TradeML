import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";

function QueryForm({ setFormData }) {
  const [company, setCompany] = useState("");
  const [capital, setCapital] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const data = { company, capital, duration };
    
    try {
      const response = await fetch("http://localhost:8080/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormData(data);
      } else {
        setError("Server error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Connection error. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Start Automated Trading
      </Typography>
      
      <TextField
        fullWidth
        label="Company/Stock"
        variant="outlined"
        margin="normal"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        placeholder="e.g., IBM, AAPL"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BusinessIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        fullWidth
        label="Investment Capital ($)"
        variant="outlined"
        margin="normal"
        type="number"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
        required
        placeholder="1000"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        fullWidth
        label="Duration (minutes)"
        variant="outlined"
        margin="normal"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
        placeholder="Minutes"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
      />
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          sx={{ mt: 3 }}
        >
          {loading ? "Processing..." : "Start AI Trading"}
        </Button>
      </motion.div>
    </Box>
  );
}

export default QueryForm;
