import UserListCard from '../cards/UserListCard';
import List from '@mui/material/List';

import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import UserListCard from '../cards/UserListCard';

import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'

import React, { useContext, useEffect } from 'react';

export default function UserScreen() {

    const { viewStore } = useContext(ViewStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.USERS);
    })

    let listCard = "";
    if (viewStore && viewStore.top5lists) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
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
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                    {listCard}
            </div>
        </div>)
}