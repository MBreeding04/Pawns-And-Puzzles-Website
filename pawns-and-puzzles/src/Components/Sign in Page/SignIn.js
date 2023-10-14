import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import checkerboard from "../../Assets/background/2.jpg"
import '../Sign in Page/SignIn.css'
import { useState } from 'react';
import Axios from "axios";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
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
    const Navigate = useNavigate();
    const VerifyLogin = async () => {
        await Axios.post("https://api-puzzles-pawns.onrender.com/SignIn", {
            Email: EmailEntry,
            Password: PasswordEntry,
        }).then(async (response) => {
            if(response.data.message === 'None'){
                setisError(true)
            }
            else{
                Navigate('/Home');
            }
        });
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
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={VerifyLogin}
                            >
                                Sign In
                            </Button>
                            <Collapse in={isError}>
                            <Alert severity="error">This email and/or password is not linked to an account!</Alert></Collapse>
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
