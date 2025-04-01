import { Box, Typography, Button, Container, Grid, Card, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./Navbar";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import ShieldIcon from "@mui/icons-material/Shield";
import UpdateIcon from "@mui/icons-material/Update";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CallToActionSection from "./CallToActionSection";

function HomePage() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Hero Section with Light Background */}
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          color: "#1E293B",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        
        <Container sx={{ flexGrow: 1, display: "flex", alignItems: "center", py: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "3rem", md: "4.5rem" },
                  }}
                >
                  AI-Powered Trading for
                  <Box component="span" sx={{ display: "block", color: "#00E676" }}>
                    Modern Investors
                  </Box>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: "600px",
                    mb: 5,
                    mt: 3,
                    lineHeight: 1.7,
                    color: "#4B5563",
                  }}
                >
                  Revolutionize your investment strategy with AutoTrade's AI algorithm 
                  that optimizes trades, minimizes risks, and maximizes returns.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{ display: "flex", gap: "16px" }}
              >
                <Button
                  component={RouterLink}
                  to="/tradearena"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#00E676",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    "&:hover": {
                      bgcolor: "#00c853",
                    },
                  }}
                >
                  Start Trading
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: "#1E293B",
                    color: "#1E293B",
                    fontWeight: "medium",
                    borderRadius: "4px",
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
              
              <Box sx={{ display: "flex", mt: 4, gap: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShieldIcon sx={{ mr: 1, color: "#00E676" }} />
                  <Typography variant="body2" color="#4B5563">Secure Trading</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <UpdateIcon sx={{ mr: 1, color: "#00E676" }} />
                  <Typography variant="body2" color="#4B5563">Real-time Data</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SmartToyIcon sx={{ mr: 1, color: "#00E676" }} />
                  <Typography variant="body2" color="#4B5563">AI Powered</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              {/* Right side image or illustration can go here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <FeaturesSection id="features"/>

      {/* How It Works Section */}
      <HowItWorksSection id="how-it-works" />

      {/* Testimonials Section */}
      <TestimonialsSection id="testimonials" />

      {/* CallToActionSection*/}
      <CallToActionSection /> 

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default HomePage;
