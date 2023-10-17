import { Typography, Box, Divider, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import '../Browse Page/Browse.css'
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
const customTheme = createTheme({

    typography: {
        fontFamily: 'Merriweather, serif',
    },
    palette: {
        primary: {
            main: '#0f4a3b',
        },
        text: {
            primary: '#000',
            secondary: '#fff',
        },
    }
});
export default function Browse() {
    const [searchQuery, setSearchQuery] = useState('')
    const SearchDatabase = async () => {
        console.log(searchQuery)
        await Axios.post("https://api-puzzles-pawns.onrender.com/Games", {
            Gname: searchQuery
        }).then(async (response) => {
            console.log(response)
        }).catch(() => {
        }
        );
    }
    return (
        <Box sx={{ display: 'block', bgcolor: '#ebebeb', width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#b8b8b8', height: '30%', width: '200px', m: '1em', borderRadius: 3, }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                        </FormGroup>

                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'end' }}>
                        <NavLink to={'/Vendors'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Become a Vendor</Button>
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
                        <NavLink to={'/Home'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Home</Button>
                        </NavLink>
                    </Box>
                    <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
                    <Box sx={{display:'flex',flexDirection:'row',width:'100%', justifyContent:'end'}}>
                        <ThemeProvider theme={customTheme}>
                            <TextField sx={{ width: '30%', my: '1em', mx: '2em' }}
                                InputLabelProps={{
                                    style: { color: '#0f4a3b' },
                                }}
                                margin="normal"
                                name="Search"
                                label="Search"
                                id="Search"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }
                                }
                            />

                        </ThemeProvider>
                        <Button sx={{
                            alignSelf: 'flex-end',
                            my: '2em', width: '15em', backgroundColor: '#0f4a3b', mr:'2em',
                            ':hover': {
                                bgcolor: '#09261f',
                                color: 'white'
                            }
                        }} onClick={SearchDatabase} variant='contained'>Search</Button>
                    </Box>
                    <Box sx={{ bgcolor: '#3d3d3d', height: '300px', width: '300px', borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src='' alt='product'></img>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
