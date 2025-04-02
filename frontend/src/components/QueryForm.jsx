// QueryForm.jsx
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
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
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
        <Table sx={{m:-2,mt:-2}}>
          <TableBody>
            <TableRow >
              <TableCell sx={{ border: 'none', color: 'white',fontWeight: 'bold', p: 1 }}>Company/Stock</TableCell>
              <TableCell sx={{ border: 'none', color: 'white', fontWeight: 'bold', p: 1 }}>Investment Capital ($)</TableCell>
              <TableCell sx={{ border: 'none', color: 'white', fontWeight: 'bold', p: 1 }}>Trading Duration</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  placeholder="Search stocks (e.g., AAPL, TSLA)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& input": { color: "white",m:-1.2},
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                  }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  required
                  placeholder="1000"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& input": { color: "white" ,m:-1.2},
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                  }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  placeholder="Select duration"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& input": { color: "white",m:-1.2 },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                  }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    sx={{ 
                      height: '56px',
                      bgcolor: "#112240", 
                      color: "#00E676", 
                      fontWeight: "bold",
                      '&:hover': {
                        color:'#112240',
                        bgcolor: '#52d1b9'
                      }
                    }}
                  >
                    {loading ? "Processing..." : "Start"}
                  </Button>
                </motion.div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default QueryForm;