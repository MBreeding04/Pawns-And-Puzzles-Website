import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
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
var width = window.innerWidth
function Home() {
    return (
        <div>
            <div className='parallax' style={{maxWidth:{width}}}>
                <ThemeProvider theme={SpecialEliteFont}><Typography>Pawns and Puzzles</Typography></ThemeProvider>
            </div>
            <Box sx={{bgcolor:'#0e1111', height:'500px'}}>

            </Box>
            <Box sx={{bgcolor:'#F5F5F5', height:'500px'}}>

            </Box>
            <Box sx={{bgcolor:'#0F4A3B', height:'500px'}}>

            </Box>
        </div>
    );
}
export default Home;