import { useState } from "react";
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

  // Smooth scroll to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleCloseNavMenu();
  };
  
  return (
    <AppBar position="static" color="transparent" elevation={0}>
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
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("hero-section")} // Redirect to Hero Section
          >
            <TrendingUpIcon sx={{ mr: 1, color: "primary.main" }} />
            AutoTrade
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {/* Mobile Menu Items */}
              <MenuItem onClick={() => scrollToSection("features")}>
                {/* Redirect to Features Section */}
                Features
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("how-it-works")}>
                {/* Redirect to How It Works Section */}
                How It Works
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("testimonials")}>
                {/* Redirect to Testimonials Section */}
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
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
            }}
            onClick={() => scrollToSection("hero-section")} // Redirect to Hero Section
          >
            <TrendingUpIcon sx={{ mr: 1, color: "primary.main" }} />
            AutoTrade
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {/* Desktop Menu Items */}
            <Button onClick={() => scrollToSection("features")} sx={{ color: "#1E293B", mx: 1 }}>
              Features {/* Redirect to Features Section */}
            </Button>
            <Button onClick={() => scrollToSection("how-it-works")} sx={{ color: "#1E293B", mx: 1 }}>
              How It Works {/* Redirect to How It Works Section */}
            </Button>
            <Button onClick={() => scrollToSection("testimonials")} sx={{ color: "#1E293B", mx: 1 }}>
              Testimonials {/* Redirect to Testimonials Section */}
            </Button>
          </Box>

          {/* Trade Now Button */}
          <Box>
            <Button component={RouterLink} to="/tradearena" variant="contained" color="primary">
              Trade Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
