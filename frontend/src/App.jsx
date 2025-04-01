import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TradeArena from "./components/TradeArena";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#00E676",
      },
      secondary: {
        main: "#1E293B",
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
        dark: "#1E293B",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tradearena" element={<TradeArena />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
