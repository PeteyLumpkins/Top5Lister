import { Button, Box } from '@mui/material/';
import { Link } from 'react-router-dom'

export default function GuestButton() {

    return (
        <Link sx={{width: '100%'}} to="/alllists/">
            <Button 
                sx={{
                    border: 1,
                    borderColor: 'black',
                    background: '#1976d2',
                    textTransform: 'none', 
                    width: '100%', 
                }}>
                <Box sx={{fontSize: '175%', color: 'white'}}>Continue as Guest</Box>
            </Button>
        </Link>
    )
}