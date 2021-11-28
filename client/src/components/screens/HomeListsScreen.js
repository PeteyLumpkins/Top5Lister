import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'
import {HomeStoreContext} from '../../store/home'

import React, { useContext, useEffect } from 'react';

import { Typography } from '@mui/material'
import List from '@mui/material/List';

import NavBar from "../nav/NavBar"
import UserListCard from '../cards/UserListCard';
import WorkSpace from '../workspace/WorkSpace';

import AddListButton from '../buttons/AddListButton';

export default function HomeScreen(props) {
    const { viewStore } = useContext(ViewStoreContext);
    const { homeStore } = useContext(HomeStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.HOME);
    }, []);

    // Handles creating a new list
    function handleCreateList() {
        homeStore.createNewList();
    };

    let homeBody = "";
    if (homeStore.currentList !== null) {
        homeBody = <WorkSpace></WorkSpace>
    } else if (viewStore && viewStore.top5lists) {
        homeBody = 
            <List sx={{ 
                width: '90%', 
                left: '5%', 
                right: '5%',
                maxHeight: '100%', 
                height: '100%', 
                overflow: 'scroll',
                }}
            >
            {
                viewStore.top5lists.map((top5list) => (
                    <UserListCard
                        key={top5list._id}
                        top5list={top5list}
                    />
                ))
            }
            </List>;
    }

    return (
            <div id="top5-list-selector">
                <NavBar></NavBar>
                <div id="list-selector-list">
                        {homeBody}
                </div>
                <div id="list-selector-heading">
                    <AddListButton></AddListButton>
                    <Typography variant="h5">Your Lists</Typography>
                </div>
            </div>
        )
}