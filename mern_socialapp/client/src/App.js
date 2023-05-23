import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/homePage";
import LoginPage from "scenes/loginPage/loginPage";
import ProfilePage from "scenes/profilePage/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar/navbar";

const App = () => {
    const mode = useSelector(state => state.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    const isAuth = Boolean(useSelector(state => state.token))

    return (
    <div className="app">
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={ isAuth ? <HomePage /> : <Navigate to="/" /> } />
                  <Route path="/profile/:usedId" element={ isAuth ? <ProfilePage /> : <Navigate to="/" /> } />
              </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
