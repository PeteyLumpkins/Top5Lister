import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';

import {ViewStoreContext} from '../../store/view'
import {ViewStorePageType} from '../../store/view'

import NavBar from "../nav/NavBar"
import UserListCard from '../cards/UserListCard';

import React, { useContext, useEffect } from 'react';

export default function UserListsScreen() {

    const { viewStore } = useContext(ViewStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.USERS);
    })

    let listCard = "";
    if (viewStore && viewStore.page === ViewStorePageType.USERS && viewStore.top5lists) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
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
            <NavBar />
            <div id="list-selector-list">
                    {listCard}
            </div>
        </div>)
}