<<<<<<< HEAD
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">{this.state.data}</p>
        </div>
      );
    }
  }

=======
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SignIn from './Components/Sign in Page/SignIn'
import Home from './Components/Home Page/Home.js'
import {
  Route,
  NavLink,
  HashRouter,
  Routes
} from "react-router-dom";
>>>>>>> 6262e167d506dc8293f2fffebf9e2253d52b249e
function App() {
  return (
    <Box sx={{ display: 'block', bgcolor: 'white', width: '100vw', height: '100vh', overflowX: 'hidden' }}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<SignIn></SignIn>} />
            <Route path='/Home' element={<Home></Home>} />
            <Route path='/Vendors' element={<div></div>} />
            <Route path='/Games' element={<div></div>} />
            <Route path='/Comments' element={<div></div>} />
          </Routes>
        </HashRouter>
    </Box>
  );
}

export default App;
