import { BrowserRouter , Navigate , Routes, Route } from "react-router-dom";
import HomePage from 'scenes/homePage'
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ChatPage from "scenes/chatPage"
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme} from '@mui/material/styles';
import { themeSettings } from "theme";
import { useMemo } from "react";
import state from "state";
import { Toaster } from "react-hot-toast";
function App() {

const mode = useSelector((state)=>state.mode);
const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);
const isAuth = Boolean(useSelector((state)=>state.token));

  return (
    <div className="app">
      <div><Toaster/></div>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={isAuth?<HomePage/>:<Navigate to='/'/>}/>
      <Route path="/profile/:userId" element={isAuth?<ProfilePage/>:<Navigate to='/'/>}/>
      <Route path="/chats" element={isAuth?<ChatPage/>:<Navigate to='/'/>}/>


    </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
