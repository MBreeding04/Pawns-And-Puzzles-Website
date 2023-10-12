import { Typography, Box, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import '../Vendor Page/Vendor.css'
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
function Vendor() {
    return (
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'start'}}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <img className='logo' src={logo} alt='Logo'/>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'start'}}>
                    <Divider orientation='horizontal' sx={{width:'100%'}}></Divider>
                </Box>
            </Box>
        </Box>
    )}
export default Vendor