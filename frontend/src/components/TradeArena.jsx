// TradeArena.jsx
import { useState } from "react";
import QueryForm from "./QueryForm";
import TradeWindow from "./TradeWindow";
import { Box, Typography, Paper, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

function TradeArena() {
  const [formData, setFormData] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        bgcolor: "#0D1B2A",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            component="h1"
            align="center"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 5 }}
          >
            TradeArena
          </Typography>
        </motion.div>

        {/* Inputs Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: "#152642",
              maxWidth: 600,
              mx: "auto",
              mb: 4
            }}
          >
            <QueryForm setFormData={setFormData} />
          </Paper>
        </motion.div>

        {/* Profit/Loss Dashboard Placeholder */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            bgcolor: "#152642",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
            Performance Dashboard
          </Typography>
          <Box sx={{ 
            height: "200px",
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94A3B8"
          }}>
            Profit/Loss metrics will be displayed here
          </Box>
        </Paper>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {/* Price Graph Placeholder */}
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: "#152642",
                height: "500px",
                mb: 3
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
                Price Movement Analysis
              </Typography>
              <Box sx={{ 
                height: "400px",
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94A3B8"
              }}>
                Trading chart will be displayed here
              </Box>
            </Paper>

            {/* Existing Trading Window */}
            {formData && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: "#152642",
                  }}
                >
                  <TradeWindow />
                </Paper>
              </motion.div>
            )}
          </Grid>

          <Grid item xs={12} lg={4}>
            {/* Existing Investment Dashboard */}
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: "#152642",
                height: "100%",
                minHeight: "500px"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "#00E676" }}>
                Investment Overview
              </Typography>
              <Box sx={{ 
                height: "400px",
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94A3B8"
              }}>
                Portfolio summary will be displayed here
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TradeArena;
