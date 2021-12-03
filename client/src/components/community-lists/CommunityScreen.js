import {CommunityStoreContext} from '../../stores/CommunityListsStore'
import React, { useContext, useEffect } from 'react';

import List from '@mui/material/List';

import StatusBar from '../Statusbar'
import NavBar from "./nav/NavBar"
import CommunityCard from './cards/CommunityCard';

export default function CommunityScreen() {
    const { communityStore } = useContext(CommunityStoreContext);

    useEffect(() => {
        communityStore.loadLists();
    }, []);

    let statusText = "Community Top 5 Lists";
    console.log(communityStore.filter);
    if (communityStore.filter) {
        statusText = "Community " + communityStore.filter + " Top 5 Lists";
    }

    let listCard = "";
    if (communityStore && communityStore.top5lists) {
        listCard = 
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
                communityStore.top5lists.map((top5list) => (
                    <CommunityCard
                        key={top5list._id}
                        communitylist={top5list}
                    />
                ))
            }
            </List>;
    }

    return (
            <div id="top5-list-selector">
                <NavBar></NavBar>
                <div id="list-selector-list">
                        {listCard}
                </div>
                <div id="list-selector-heading">
                </div>
                <StatusBar text={statusText}></StatusBar>
            </div>
    );
}