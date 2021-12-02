import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import HomeButton from '../buttons/HomeListsButton';
import AllUsersButton from '../buttons/UserListsButton';
import CommunityButton from '../buttons/CommunityListsButton';
import AllListsButton from '../buttons/AllListsButton';
import SortButton from '../buttons/SortButton';

import { Link } from 'react-router-dom'

import SearchBar from './SearchField';

import AuthContext from '../../../auth';
import { useContext } from 'react';

export default function NavBar(props) {

    const { auth } = useContext(AuthContext);

    let home = <Link to='/'><HomeButton/> </Link>
    if (auth.user === null) {
        home = <HomeButton disabled={true}/> 
    }

    return (
        <Box sx={{ height: "10%", flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ background: "primary" }}>
                    {home}
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