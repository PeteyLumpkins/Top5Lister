import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import UserListCard from '../cards/UserListCard';

import NavBar from '../nav/NavBar'

import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'

import React, { useContext, useEffect } from 'react';

export default function AllListsScreen() {

    const { viewStore } = useContext(ViewStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.ALL);
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
                        name={top5list.name}
                        published={top5list.published}
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