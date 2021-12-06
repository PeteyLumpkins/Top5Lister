import { Button, Box } from '@mui/material/';
import { Link } from 'react-router-dom'

/**
 * Button displayed on the SplashScreen. Links guests to the register screen.
 * @author PeteyLumpkins
 */
export default function RegisterButton() {
    return (
        <Link to="/register/" sx={{width: '100%'}}>
            <Button 
                sx={{
                    border: 1,
                    borderColor: 'black',
                    background: '#1976d2',
                    textTransform: 'none',
                    width: '100%'
                }}>
                <Box sx={{fontSize: '175%', color: 'white'}}>Register</Box>
            </Button>
        </Link>
    )
}