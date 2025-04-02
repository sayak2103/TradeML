import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimelineIcon from "@mui/icons-material/Timeline";
import SecurityIcon from "@mui/icons-material/Security";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function FeaturesSection() {
  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "Advanced AI Algorithm",
      description: "Our proprietary algorithm analyzes market trends and executes trades at optimal times."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Real-Time Analysis",
      description: "Get instant insights with real-time data analysis and market predictions."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Risk Management",
      description: "Sophisticated risk assessment tools to protect your investments during market volatility."
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: 40 }} />,
      title: "Trade On-the-Go",
      description: "Fully responsive platform that works seamlessly on any device, anywhere."
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      title: "Diversified Portfolio",
      description: "Our AI helps diversify your investments across sectors for balanced growth."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Trading",
      description: "Enterprise-grade security ensures your investments and data remain protected."
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "#1E293B" }}>
      <Container>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
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
          >
            Why Trade with TradeML
          </Typography>
          <Typography variant="body1" align="center" color="#CBD5E1" sx={{ mb: 6 }}>
            Our AI-powered platform gives you the edge in the market with cutting-edge features designed for modern investors.
          </Typography>
        </motion.div>

        {/* Cards Section */}
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ width: "100%" }} // Ensures consistent width
              >
                <Card
                  sx={{
                    flex: 1, // Ensures all cards take equal space
                    height: "100%", // Ensures all cards are of equal height
                    bgcolor: "#2D3748",
                    color: "white",
                    boxShadow: 4,
                    borderRadius: "10px",
                    width : "50vh", 
                    transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      bgcolor: "#00E676",
                      color: "#1E293B",
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3, "&:hover p": { color: "#1E293B" } }}>
                    {/* Card Icon */}
                    <Avatar
                      sx={{
                        bgcolor: "#00E676",
                        color: "#1E293B",
                        width: 60, // Reduced size
                        height: 60,
                        mx: "auto",
                        mb: 2,
                        transition: "background-color 0.3s ease-in-out"
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    {/* Card Title */}
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    {/* Card Description */}
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
