import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";

function FeaturesSection() {
  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "AI-Powered Analysis",
      description: "Our algorithms analyze market trends in real-time to identify optimal trading opportunities."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Automated Trading",
      description: "Set your parameters and let our system execute trades at the perfect moment."
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: "Real-Time Monitoring",
      description: "Track your investments with live updates and comprehensive performance metrics."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Risk Management",
      description: "Advanced tools to set stop-losses and take-profits to protect your investments."
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "#1E293B" }}>
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
            Key Features
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card sx={{ height: "100%", bgcolor: "#2D3748", color: "white", boxShadow: 4 }}>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar sx={{ bgcolor: "#00E676", color: "#1E293B", width: 70, height: 70, mx: "auto", mb: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="#CBD5E1">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
