import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'
import React, { useContext, useEffect } from 'react';

import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';

import NavBar from "../nav/NavBar"
import UserListCard from '../cards/UserListCard';

export default function CommunityListsScreen() {
    const { viewStore } = useContext(ViewStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.COMMUNITY);
    }, []);

    let listCard = "";
    if (viewStore && viewStore.top5lists) {
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
                        {listCard}
                </div>
                <div id="list-selector-heading">
    
                </div>
            </div>
    );
}