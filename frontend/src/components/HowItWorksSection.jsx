import { Box, Container, Typography, Stepper, Step, StepLabel, StepContent, Paper } from "@mui/material";
import { motion } from "framer-motion";

function HowItWorksSection() {
  const steps = [
    {
      label: "Create Your Account",
      description: "Sign up in minutes with our simple and secure registration process."
    },
    {
      label: "Configure Your Strategy",
      description: "Set your investment amount, risk tolerance, and trading preferences."
    },
    {
      label: "AI Analysis & Optimization",
      description: "Our AI analyzes market data to identify the best trading opportunities."
    },
    {
      label: "Automated Execution",
      description: "Trades are executed automatically at optimal entry and exit points."
    },
    {
      label: "Track Performance",
      description: "Monitor your investments with real-time reporting and analytics."
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "#0F172A" }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            fontWeight="bold"
            color="white"
            sx={{ mb: 6 }}
          >
            How It Works
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Stepper orientation="vertical" sx={{ "& .MuiStepLabel-label": { color: "white" } }}>
            {steps.map((step, index) => (
              <Step active key={index}>
                <StepLabel>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Typography variant="h6" color="white" fontWeight="medium">
                      {step.label}
                    </Typography>
                  </motion.div>
                </StepLabel>
                <StepContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Paper sx={{ p: 3, bgcolor: "#2D3748", color: "#CBD5E1", mb: 3 }}>
                      <Typography>{step.description}</Typography>
                    </Paper>
                  </motion.div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;
