import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Divider
} from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
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
  },
});


const checkerboard = '../../Assets/Logocheckerboard/BGwithlogo.jpg'; 

function App() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [nextReviewId, setNextReviewId] = useState(1); // Counter for assigning unique review IDs

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { id: nextReviewId, name, comment };
    setReviews([...reviews, newReview]);
    setName('');
    setComment('');
    setNextReviewId(nextReviewId + 1); // Increment the ID counter
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          background: `url(${checkerboard}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
        
      >
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
      <img className='backdrop' src={checkerboard}></img>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Board Game Reviews
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {reviews.map((review) => (
              <Grid item xs={12} key={review.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography>{review.comment}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">Leave Your Review</Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 2 }}> {/* Add margin-bottom */}
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className="custom-textfield"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}> {/* Add margin-bottom */}
                    <TextField
                      required
                      fullWidth
                      label="Your Review"
                      multiline
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className="custom-textfield"
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Submit Review
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
