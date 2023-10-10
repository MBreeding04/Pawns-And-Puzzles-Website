import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './Home.css'
import {
    Route,
    NavLink,
    HashRouter,
    Routes
} from "react-router-dom";
import { Typography } from '@mui/material';
const MerriweatherFont = createTheme({
    typography: {
        fontFamily: ['Merriweather', 'serif'].join(",")
    },
});
const SpecialEliteFont = createTheme({
    typography: {
        fontFamily: ['Special Elite', 'cursive'].join(",")
    },
});
function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='chessPeices'>
                
            </div>
            <Box sx={{ bgcolor: '#0f4a3b', width: '100%', height: '60vh' }}>
            </Box>
            <Box sx={{ bgcolor: '#EEEEEB', width: '100%', height: '60vh' }}>
            </Box>
            <Box sx={{ bgcolor: '#141414', width: '100%', height: '60vh' }}>
            </Box>
        </div>
    );
}
export default Home;