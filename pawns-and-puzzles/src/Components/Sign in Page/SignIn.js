import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
    NavLink
} from "react-router-dom";

function SignIn() {

    return (
        <Box sx={{bgcolor:'yellow'}}>
            <NavLink to='/Home'><Button>hello</Button></NavLink>
        </Box>
    );
}
export default SignIn;