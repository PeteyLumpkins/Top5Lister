import { HomeStoreContext } from '../../stores/HomeListsStore'
import React, { useContext, useEffect } from 'react';

import { Typography } from '@mui/material'
import List from '@mui/material/List';

import StatusBar from "../Statusbar"
import NavBar from "./nav/NavBar"
import ListCard from './cards/ListCard';
import WorkSpace from './workspace/WorkSpace';
import DeleteListModel from './models/DeleteListModel'

import AddListButton from './buttons/AddListButton';

/**
 * Returns the HomeListsScreeen for our application
 * @author PeteyLumpkins
 */
export default function HomeScreen() {
    const { homeStore } = useContext(HomeStoreContext);

    useEffect(() => {
        homeStore.loadLists();
    }, []);

    let homeBody = "";
    let statusText = "Your Top5Lists"

    if (homeStore.currentList !== null) {
        homeBody = <WorkSpace></WorkSpace>
        statusText = "Top 5 " + homeStore.currentList.name + " List";
    } else if (homeStore && homeStore.top5lists) {
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
                homeStore.top5lists.map((top5list) => (
                    <ListCard
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
                </div>
                <StatusBar text={statusText}></StatusBar>
                <DeleteListModel 
                    open={homeStore.listMarkedForDeletion !== null} 
                    listName={homeStore.listMarkedForDeletion === null ? null : homeStore.listMarkedForDeletion.name}
                ></DeleteListModel>
            </div>
        )
}