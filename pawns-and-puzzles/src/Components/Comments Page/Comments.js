import React, { useEffect, useState } from 'react';
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
import checkerboard from '../../Assets/background/CheckerboardBackground.jpg'
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import {
  NavLink,
} from "react-router-dom";
import Axios from "axios";
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

function App() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const renderDelete = (commentRef, ChatRef) => {
    let userId = document.cookie
    let temp = userId.split('=')
    var finalUserId = temp[1]
    console.log(finalUserId)
    if (finalUserId == 1) {
      return (<Box><Button
        variant="outlined"
        sx={{mr:4}}
        color="error"
        onClick={() => handleDelete(ChatRef)}
      >
        Delete
      </Button><Button
        variant="outlined"
        color="secondary"
        onClick={() => handleEdit(90)}
      >
        Edit
      </Button></Box>
      )
    }
    else if (finalUserId == commentRef) {
      return (<Button
        variant="outlined"
        color="secondary"
        onClick={() => handleEdit(90)}
      >
        Edit
      </Button>)
    }
    else {
      return (null)
    }
  }
  const handleDelete = async (ChatID) => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/DeleteComment", {
      reviewID: ChatID
  }).then(async (response) => {
    RenderComments()
  })
  };
  const handleEdit = () =>{

  }
  const RenderComments = async () => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/Comment", {
    }).then(async (response) => {
      console.log('repsonse', response.data)
      let newReviews = []
      for (let i = 0; i < response.data.length; i++) {
        newReviews.push({ ReviewId: response.data[i].ChatID, CommentBody: response.data[i].Comment, UserId: response.data[i].userID, Commenter: response.data[i].Email })
        console.log('pulled review', newReviews)
      }
      setReviews(newReviews)
      reviews.map.size = reviews.length
      console.log('final', reviews)

    })
  };
  const handleSubmit = async () => {
    let userId = document.cookie
    let temp = userId.split('=')
    var finalUserId = temp[1]
    await Axios.post("https://api-puzzles-pawns.onrender.com/AddComment", {
      commentEntry: comment,
      userId: finalUserId
    }).then(async (response) => {
      console.log(response)
    })
    RenderComments()
  }
  useEffect(() => {
    RenderComments()
  }, [])
  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          background: `url(${checkerboard}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}

      >
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
            <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>

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
                        <NavLink to={'/Games'} style={{ alignSelf: 'center' }}>
                            <Button sx={{
                                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                                ':hover': {
                                    bgcolor: '#09261f',
                                    color: 'white'
                                }
                            }} variant='contained'>Browse Games</Button>
                        </NavLink>
                    </Box>
            <Divider variant='middle' orientation='horizontal' sx={{ width: '95%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
          </Box>
        </Box>
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
              <Grid item xs={12} key={review.ReviewId}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography fontWeight={'bold'}>{review.CommentBody}</Typography>
                  <Typography color={'grey'} variant="h6">- {review.Commenter}</Typography>
                  {renderDelete(review.UserId, review.ReviewId)}
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <Typography sx={{mb:2}} variant="h6">Leave Your Review</Typography>
                <form onSubmit={handleSubmit}>
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
