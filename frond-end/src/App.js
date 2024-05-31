import axios from "axios"
import './App.css';
import { useState, useEffect } from 'react'
import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeScreen from "./ui/home/HomeScreen";
import LoginScreen, { AuthProvider, RequireAuth } from "./ui/login/LoginScreen";
import LogoutScreen from "./ui/login/LogoutScreen";
import AppAppBar from "./components/appBar/AppBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from "./getLPTheme";
import { CssBaseline } from "@mui/material";
import PostScreen from "./ui/posts/PostScreen";

const URI = 'http://localhost:8000/users'

function App() {

  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const res = await axios.get(URI)
    setUsers(res.data)
  }

  const [user, setUser] = useState();

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
            <Route path="/register" element={<LogoutScreen />} />
            <Route element={<AppAppBar mode={mode} toggleColorMode={toggleColorMode} />} >
              <Route path="/posts" element={
                <RequireAuth>
                  <PostScreen />
                </RequireAuth>
              } />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
    /*     <>
          <nav style={{ margin: 10 }}>
            <Link to="/" style={{ padding: 5 }}>
              Home
            </Link>
            <Link to="/posts" style={{ padding: 5 }}>
              Posts
            </Link>
            <span> | </span>
            {!user && <Link to="/login" style={{ padding: 5 }}>
              Login
            </Link>}
            {user && <span onClick={logOut} style={{ padding: 5, cursor: 'pointer' }}>
              Logout
            </span>}
          </nav>
        </> */
  );
}

export default App;