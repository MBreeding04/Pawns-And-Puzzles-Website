import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SignIn from './Components/Sign in Page/SignIn'
import Home from './Components/Home Page/Home.js'
import {
  Route,
  NavLink,
  HashRouter,
  Routes
} from "react-router-dom";
function App() {
  return (
    <Box sx={{ display: 'block', bgcolor: 'white', width: '100vw', height: '100vh', overflowX: 'hidden' }}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<SignIn></SignIn>} />
            <Route path='/Home' element={<Home></Home>} />
            <Route path='/Vendors' element={<div></div>} />
            <Route path='/Games' element={<div></div>} />
            <Route path='/Comments' element={<div></div>} />
          </Routes>
        </HashRouter>
    </Box>
  );
}

export default App;
