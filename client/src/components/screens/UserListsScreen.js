import List from '@mui/material/List';

import {ViewStoreContext} from '../../stores/view'
import {ViewStorePageType} from '../../stores/view'

import NavBar from "../nav/NavBar"
import UserListCard from '../cards/top5list/UserListCard';

import React, { useContext, useEffect } from 'react';

export default function UserListsScreen() {

    const { viewStore } = useContext(ViewStoreContext);

    useEffect(() => {
        viewStore.loadPage(ViewStorePageType.USERS);
    })

    let listCard = "";
    if (viewStore && viewStore.top5lists) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
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
            <NavBar />
            <div id="list-selector-list">
                    {listCard}
            </div>
        </div>)
}