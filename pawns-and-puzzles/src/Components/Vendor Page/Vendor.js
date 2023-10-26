import { Typography, Box, Divider, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import '../Vendor Page/Vendor.css'
import {
    NavLink,
} from "react-router-dom";
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
export default function Browse() {
    return (
        <Box sx={{ display: 'flex', minHeight: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'grey', width: '200px' }}>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'end' }}>
                        <NavLink to={'/Home'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Home</Button>
                        </NavLink>
                        <NavLink to={'/Games'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Browse Games</Button>
                        </NavLink>
                        <NavLink to={'/Comments'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Community</Button>
                        </NavLink>
                    </Box>
                    <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
                </Box>
            </Box>
        </Box>
    )
}