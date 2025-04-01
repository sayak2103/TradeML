import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Handle opening and closing of mobile menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Enable smooth scrolling globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Smooth scroll to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // Adjust for fixed navbar height
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#0F172A" }} elevation={0} width="100%">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* App Icon */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "#F1F5F9", // Light color for better visibility
              textDecoration: "none",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("hero-section")}
          >
            <TrendingUpIcon sx={{ mr: 1, color: "#FACC15" }} /> {/* Yellow accent */}
            AutoTrade
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#FACC15" }} // Yellow icon color
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={() => scrollToSection("features")} sx={{ color: "#F1F5F9" }}>
                Features
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("how-it-works")} sx={{ color: "#F1F5F9" }}>
                How It Works
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("testimonials")} sx={{ color: "#F1F5F9" }}>
                Testimonials
              </MenuItem>
            </Menu>
          </Box>

          {/* App Icon for Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "#F1F5F9",
              textDecoration: "none",
              alignItems: "center",
            }}
            onClick={() => scrollToSection("hero-section")}
          >
            <TrendingUpIcon sx={{ mr: 1, color: "#FACC15" }} />
            AutoTrade
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Button onClick={() => scrollToSection("features")} sx={{ color: "#F1F5F9", mx: 1 }}>
              Features
            </Button>
            <Button onClick={() => scrollToSection("how-it-works")} sx={{ color: "#F1F5F9", mx: 1 }}>
              How It Works
            </Button>
            <Button onClick={() => scrollToSection("testimonials")} sx={{ color: "#F1F5F9", mx: 1 }}>
              Testimonials
            </Button>
          </Box>

          {/* Trade Now Button */}
          <Box>
            <Button
              component={RouterLink}
              to="/tradearena"
              variant="contained"
              sx={{ bgcolor: "#FACC15", color: "#0F172A" }}
            >
              Trade Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
