import {AllListsStoreContext} from '../../stores/AllListsStore'

import React, { useContext, useEffect } from 'react';

import List from '@mui/material/List';

import StatusBar from "../Statusbar"
import NavBar from "./nav/NavBar"
import ListCard from './cards/ListCard';

/**
 * The AllListsScreen of our application. Handles the display and interaction of users and guests
 * with all of the published top5lists.
 * @author PeteyLumpkins
 */
export default function AllListsScreen() {
    const { allListsStore } = useContext(AllListsStoreContext);

    useEffect(() => {
        allListsStore.loadLists();
    }, []);

    let statusText = "All Top 5 Lists"
    if (allListsStore.filter) {
        statusText = "Top 5 " + allListsStore.filter + " Lists";
    }

    let homeBody = "";
    if (allListsStore && allListsStore.top5lists) {
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
                allListsStore.top5lists.map((top5list) => (
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
                </div>
                <StatusBar text={statusText}></StatusBar>
            </div>
        )
}