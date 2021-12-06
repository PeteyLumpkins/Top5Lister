import { Box } from '@mui/material/';

import LoginButton from './buttons/LoginButton';
import RegisterButton from './buttons/RegisterButton';
import GuestButton from './buttons/GuestButton';

/**
 * The SplashScreen for our application. This is the first screen users see when
 * they visit the website.
 * 
 * @author PeteyLumpkins
 */
export default function SplashScreen() {

    return (    
        <Box id="splash" sx={{height: "100%", width: "100%"}}>
            <Box sx={{
                display: 'flex', 
                height: "20%", 
                width: '100%', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '400%', 
                color: 'gold'
                }}
            >Welcome to the Top 5 Lister 
            </Box>
            <Box sx={{display: 'flex', 
                height: "20%", 
                width: '100%', 
                justifyContent: 'center', 
                fontSize: '125%', 
                color: 'gold'
                }}
            >Where you can create, like, dislike, and comment on all your favorite Top5Lists!
            </Box>
            <Box sx={{
                display: 'flex',
                height: '10%',
                width: '100%', 
                justifyContent: 'center', 
                fontSize: '150%',
                color: 'gold'
            }}>
                By Peter Walsh!
            </Box>
            <Box sx={{
                display: 'flex', 
                height: "50%", 
                width: "100%", 
                alignItems: 'center', 
                justifyContent: 'space-around',
                }}
            >
                <Box sx={{width: '25%'}}><LoginButton></LoginButton></Box>
                <Box sx={{width: '25%'}}><RegisterButton></RegisterButton></Box>
                <Box sx={{width: '25%'}}><GuestButton></GuestButton></Box>
            </Box>
        </Box>           
    );
}