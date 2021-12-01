import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import HomeButton from './HomeButton';
import AllUsersButton from './AllUsersButton';
import CommunityButton from './CommunityButton';
import AllListsButton from './AllListsButton';
import SortButton from './SortButton';

import { Link } from 'react-router-dom'

import SearchBar from './SearchBar';

import AuthContext from '../../auth';
import { useContext } from 'react';

export default function NavBar(props) {

    const { auth } = useContext(AuthContext);

    return (
        <Box sx={{ height: "10%", flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ background: "primary" }}>
                    <HomeButton disabled={auth.user === null}/> 
                    <Link to="/alllists"> <AllListsButton disabled={false}/> </Link>
                    <Link to="/userlists"> <AllUsersButton disabled={false}/> </Link>
                    <Link to="/communitylists"> <CommunityButton disabled={false}/> </Link>
                    <SearchBar disabled={false} label={"Hello World"}/>
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'right' }} > <SortButton disabled={false}/> </Box>
                </Toolbar>
            </AppBar>        
        </Box>
    );
}