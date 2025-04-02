import { Box, Container, Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#0F172A", color: "white", pt: 8, pb: 4 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              AutoTrade
            </Typography>
            <Typography variant="body2" color="#CBD5E1" sx={{ mb: 2, maxWidth: 300 }}>
              Revolutionizing trading with AI-powered algorithms and automated execution for modern investors.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "#CBD5E1" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "#CBD5E1" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "#CBD5E1" }}>
                <FacebookIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>About</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Careers</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Blog</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ color: "#CBD5E1" }}>Contact</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Documentation</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Help Center</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>API</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ color: "#CBD5E1" }}>Status</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Privacy</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Terms</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Security</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ color: "#CBD5E1" }}>Compliance</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>FAQs</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1, color: "#CBD5E1" }}>Pricing</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ color: "#CBD5E1" }}>Contact Us</Link>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, bgcolor: "#2D3748" }} />
        <Typography variant="body2" color="#94A3B8" align="center">
          &copy; {new Date().getFullYear()} AutoTrade. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
