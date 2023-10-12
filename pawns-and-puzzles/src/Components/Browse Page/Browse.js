import { Typography, Box, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import '../Browse Page/Browse.css'
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
        <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', height:'100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <img className='logo' src={logo} alt='Chess' />
                <Box sx={{display:'flex', flexDirection:'column', bgcolor:'grey'}}>

                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%' }}>   
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'end'}}>
                    <Box sx={{display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center',bgcolor:'#0f4a3b', m:'1em', borderRadius:4, width:'40%'}}>
                        <ThemeProvider theme={MerriweatherFont}><Typography sx={{m:'1em', fontWeight: 'bold', color:'#F5F5F5'}}>Games</Typography></ThemeProvider>
                    </Box>
                </Box>
                <Divider variant='middle' orientation='horizontal' sx={{ width: '95%', bgcolor:'#0f4a3b', borderBottomWidth:'0.15em',  }}></Divider>
            </Box>
        </Box>
    )
}
