import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'
import {HomeStoreContext} from '../../store/home'
import AuthContext from '../../auth'

import React, { useContext, useEffect } from 'react';

import { Typography } from '@mui/material'
import List from '@mui/material/List';

import StatusBar from "../Statusbar"
import NavBar from "../nav/NavBar"
import UserListCard from '../cards/top5list/UserListCard';
import WorkSpace from '../workspace/WorkSpace';
import DeleteListModel from '../models/DeleteListModel'

import AddListButton from '../buttons/AddListButton';

export default function HomeScreen() {
    const { viewStore } = useContext(ViewStoreContext);
    const { homeStore } = useContext(HomeStoreContext);
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.HOME);
    }, []);

    // Handles creating a new list
    function handleCreateList() {
        homeStore.createNewList();
    };

    let homeBody = "";
    let statusText = "Your Top5Lists"
    if (homeStore.currentList !== null) {
        homeBody = <WorkSpace></WorkSpace>
        statusText = "Top 5 " + homeStore.currentList.name + " List";
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
                <StatusBar text={statusText}></StatusBar>
                <DeleteListModel 
                    open={homeStore.listMarkedForDeletion !== null} 
                    listName={homeStore.listMarkedForDeletion === null ? null : homeStore.listMarkedForDeletion.name}
                ></DeleteListModel>
            </div>
        )
}