import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import HomeButton from '../buttons/HomeListsButton';
import UserListsButton from '../buttons/UserListsButton';
import CommunityButton from '../buttons/CommunityListsButton';
import AllListsButton from '../buttons/AllListsButton';
import SortButton from '../buttons/SortButton';

import { Link } from 'react-router-dom'

import SearchField from './SearchField';

import AuthContext from '../../../auth';
import { HomeStoreContext } from '../../../stores/HomeListsStore';
import { useContext } from 'react';

export default function NavBar(props) {

    const { homeStore } = useContext(HomeStoreContext);
    const { auth } = useContext(AuthContext);

    let home = <Link to='/'><HomeButton/> </Link>
    let all = <Link to="/alllists"> <AllListsButton/> </Link>
    let user = <Link to="/userlists"> <UserListsButton/> </Link>
    let community = <Link to="/communitylists"> <CommunityButton/> </Link>

    if (homeStore.currentList !== null) {
        home = <HomeButton disabled={true}/> 
        all = <AllListsButton disabled={true}/>
        user = <UserListsButton disabled={true}/>
        community = <CommunityButton disabled={true}/>
    }

    if (auth.user === null) {
        home = <HomeButton disabled={true}/> 
    }

    return (
        <Box sx={{ height: "10%", flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ background: "primary" }}>
                    {home}
                    {all}
                    {user}
                    {community}
                    <SearchField disabled={homeStore.currentList !== null} />
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'right' }} > 
                        <SortButton disabled={homeStore.currentList !== null}/> 
                    </Box>
                </Toolbar>
            </AppBar>        
        </Box>
    );
}