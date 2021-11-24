import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import AuthContext from '../auth'
import api from '../api'

export const ViewStoreActionType = {
    SET_PAGE: 'SET_PAGE',
    SET_TOP5LISTS: 'SET_TOP5LISTS',
}

export const ViewStorePageType = {
    HOME: 'HOME',
    USERS: 'USERS',
    COMMUNITY: 'COMMUNITY',
    ALL: 'ALL'
}

export const ViewStoreSortType = {
    LIKES: 'LIKES'
}

function ViewStoreContextProvider(props) {

    const [viewStore, setViewStore] = useState({
        top5lists: null,
        page: null
    })

    const viewStoreReducer = (action) => {
        const {type, payload} = action;

        switch(type) {

            default: {
                return viewStore;
            }
        }
    }

    viewStore.viewPost = async function (listId) {

    }

    viewStore.likePost = async function (listId, userName) {
        // 1.) Get the post to like
        // 2.) Check dislikes doesn't contain userName ?? - might be able to do before
        // 3.) Add like to posts likes
        // 4.) Update the post
        // 5.) Reload the lists... 
    }

    viewStore.dislikePost = async function (listId, userName) {
        // 1.) Get the post to dislike
        // 2.) Check likes doesn't contain userName ?? - might be able to do before
        // 3.) Add dislike to posts dislikes
        // 4.) Update the post
        // 5.) Reload the lists... expensive
    }

    viewStore.postComment = async function (listId, userName, text) {
        // 1.) Get the post to add the comment to
        // 2.) 
    }

    return [viewStore, viewStoreReducer];
}

