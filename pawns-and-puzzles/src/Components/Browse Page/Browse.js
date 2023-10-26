import { Typography, Box, Divider, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from "axios";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import React, { Component } from 'react';
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
    const [searchResult, setSearchResult] = useState([])
    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const SearchDatabase = async () => {
        await Axios.post("https://api-puzzles-pawns.onrender.com/Games", {
            Gname: searchQuery
        }).then(async (response) => {
            if (response.data.message === 'None') {
                setIsAlert(true)
                setalertMessage(response.data.error)
            }
            else {
                setIsAlert(false)
                let temp = []
                for (let i = 0; i < (response.data.length); i++) {
                    let tempName = (response.data[i].Gname);
                    let tempDesc = (response.data[i].descp);
                    let tempType = (response.data[i].Type);
                    let tempPrice = (response.data[i].Price);
                    let tempPic = (response.data[i].picture);
                    temp.push({ name: tempName, desc: tempDesc, type: tempType, price: tempPrice, picture: tempPic});
                }
                setSearchResult(temp)
                searchResult.map.size = searchResult.length
                console.log('result in state: ', searchResult);
            }
        }).catch(() => {
        }
        );
    }
    useEffect(() => {
        SearchDatabase()
    },)
    return (
        <Box sx={{ display: 'flex', bgcolor: '#fefff5', minHeight:'100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#e9e9e9', width: '200px', m: '1em', borderRadius: 3,boxShadow:'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);' }}>
                        <FormGroup>
                            <FormControlLabel sx={{alignItems:'center',mx:'0.5em'}}control={<Checkbox defaultChecked />} label="Board Game" />
                            <FormControlLabel sx={{alignItems:'center',mx:'0.5em'}}control={<Checkbox defaultChecked />} label="Lowest to Highest" />
                            <FormControlLabel sx={{alignItems:'center',mx:'0.5em'}}control={<Checkbox defaultChecked />} label="Highest to Lowest" />
                        </FormGroup>
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
                    </Box>
                    <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end' }}>
                        <ThemeProvider theme={customTheme}>
                            <TextField sx={{ width: '30%', my: '1em', mx: '2em' }}
                                InputLabelProps={{
                                    style: { color: '#0f4a3b' },
                                }}
                                margin="normal"
                                name="Search"
                                label="Search"
                                id="Search"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }
                                }
                            />
                        </ThemeProvider>
                    </Box>
                    <Collapse in={isAlert}>
                        <Alert severity="error">{alertMessage}</Alert>
                    </Collapse>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {searchResult.map((result) => (
                            <Box sx={{
                                bgcolor: '#e9e9e9',
                                borderRadius: 2, Width:'400px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: '1em',my:'1em', boxShadow:'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);'
                            }}>
                                <img className='products' src = {`${result.picture}`} alt='product'></img><ThemeProvider theme={MerriweatherFont}><Typography sx={{ fontSize: '2em' }}>{result.name}</Typography>
                                    <Typography align='left' color={'#595959'} sx={{ fontSize: '1em',mt:'1em', maxWidth:'30em',mx:'1em' }}>{result.desc}</Typography>
                                    <Typography align='left' color={'#0f4a3b'} sx={{ fontSize: '1.5em',mt:'0.5em',fontWeight:'bold'}}>{result.price}</Typography>
                                    <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Add to Cart</Button>
                                </ThemeProvider>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
