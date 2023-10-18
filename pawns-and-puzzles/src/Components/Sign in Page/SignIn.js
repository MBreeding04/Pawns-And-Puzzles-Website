import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import checkerboard from "../../Assets/background/2.jpg"
import '../Sign in Page/SignIn.css'
import Axios from "axios";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";


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
const defaultTheme = createTheme();



export default function SignInSide() {
    const [EmailEntry, setEmail] = useState("");
    const [PasswordEntry, setPassword] = useState("");
    const [isError, setisError] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [errMessage, seterrMessage] = useState("");
    const Navigate = useNavigate();
    const VerifyLogin = async () => {
        setisLoading(true)
        await Axios.post("https://api-puzzles-pawns.onrender.com/SignIn", {
            Email: EmailEntry,
            Password: PasswordEntry,
        }).then(async (response) => {
            if (response.data.message === 'None') {
                setisError(true)
                setisLoading(false)
                seterrMessage("This email and/or password is not linked to an account!")
            }
            else if(response.data.message === 'API') {
                setisError(true)
                setisLoading(false)
                seterrMessage("Api has failed, sorry for the inconvenience")
            }
            else {
                Navigate('/Home');
            }
        }).catch(() => {
            setisError(true)
            setisLoading(false)
            seterrMessage('Api has failed, sorry for the inconvenience')
        }
        );
    }
    return (
        <ThemeProvider theme={customTheme}>
          
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: { checkerboard }
                    }}
                ><img className='backdrop' src={checkerboard}></img></Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <Box
                        sx={{
                            my: 42,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Welcome to Pawns and Puzzles
                        </Typography>
                        <Typography component="h1" variant="h5">
                            Please Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField 
                            InputLabelProps={{
                                style: { color: '#0f4a3b' },
                            }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) =>
                                    setEmail(e.target.value)}
                            />
                            <TextField 
                                InputLabelProps={{
                                    style: { color: '#0f4a3b' },
                                }}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setPassword(e.target.value)}
                            />
                            <LoadingButton
                                loading={isLoading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={VerifyLogin}
                            >
                                Sign In
                            </LoadingButton>
                            <Collapse in={isError}>
                                <Alert severity="error">{errMessage}</Alert></Collapse>
                            <Grid container>
                                <Grid item xs></Grid>
                                <Grid item></Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
