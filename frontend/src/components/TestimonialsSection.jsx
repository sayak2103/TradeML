import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Day Trader",
      rating: 5,
      testimonial: "AutoTrade has completely transformed my trading strategy. The AI recommendations have increased my returns by 30% in just three months."
    },
    {
      name: "Michael Chen",
      role: "Long-term Investor",
      rating: 5,
      testimonial: "As someone who doesn't have time to monitor markets constantly, AutoTrade's automated system is perfect. It handles the trading while I focus on my career."
    },
    {
      name: "Priya Sharma",
      role: "Financial Advisor",
      rating: 4,
      testimonial: "I recommend AutoTrade to my clients who want to diversify their investment strategy. The risk management tools are particularly impressive."
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
            What Our Users Say
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card sx={{ height: "100%", bgcolor: "#2D3748", color: "white", boxShadow: 4, position: "relative", p: 2 }}>
                  <Box sx={{ position: "absolute", top: 20, right: 20, color: "#00E676", opacity: 0.3 }}>
                    <FormatQuoteIcon sx={{ fontSize: 60, transform: "rotate(180deg)" }} />
                  </Box>
                  <CardContent>
                    <Typography variant="body1" color="#CBD5E1" sx={{ mb: 3, position: "relative", zIndex: 1 }}>
                      "{testimonial.testimonial}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#00E676", color: "#1E293B" }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="#CBD5E1">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mt: 2 }} />
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

export default TestimonialsSection;
