import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/homePage";
import LoginPage from "scenes/loginPage/loginPage";
import ProfilePage from "scenes/profilePage/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

const App = () => {
    const mode = useSelector(state => state.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile/:usedId" element={<ProfilePage />} />
              </Routes>
          </ThemeProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
