import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

function CallToActionSection() {
  return (
    <Box sx={{ bgcolor: "#0F172A", color: "white", py: 10, textAlign: "center" }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to <span style={{ color: "#00E676" }}>Transform</span> Your Investment Strategy?
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "700px", margin: "auto", mb: 4 }}>
            Join thousands of investors who are already leveraging AI to maximize their returns.
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
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
                "&:hover": { bgcolor: "#00c853" },
              }}
            >
              Enter the Trade Arena →
            </Button>
            <Button
              component={RouterLink}
              to='/demo'
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "white",
                color: "white",
                fontWeight: "medium",
                "&:hover": { borderColor: "#00E676", color: "#00E676" },
              }}
            >
              Watch Demo
            </Button>
          </Box>

          {/* Icons Under Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              ✅ No credit card required
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              ✅ Free 14-day trial
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              ✅ Cancel anytime
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default CallToActionSection;
