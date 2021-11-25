import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import HomeButton from './HomeButton';
import AllUsersButton from './AllUsersButton';
import CommunityButton from './CommunityButton';
import AllListsButton from './AllListsButton';

export default function NavBar(props) {

    return (
        <Box sx={{ height: "10%", flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ background: "primary" }}>
                    <HomeButton disabled={true}/>
                    <AllListsButton disabled={false}/>
                    <AllUsersButton disabled={false}/>
                    <CommunityButton disabled={false}/>
                </Toolbar>
            </AppBar>        
        </Box>
    );
}