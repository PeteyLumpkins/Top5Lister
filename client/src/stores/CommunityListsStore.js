import { createContext, useContext, useState } from 'react'
import api from '../api'

import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author PeteyLumpkins
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const CommunityStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const CommunityStoreActionType = {
    SET_LISTS: "SET_LISTS",
    SET_FILTER: "SET_FILTER",
    SET_SORT_TYPE: "SET_SORT_TYPE",
}

export const CommunityStoreSortType = {
    LIKES: 'LIKES',
    DISLIKES: 'DISLIKES',
    VIEWS: 'VIEWS',
    OLDEST: 'OLDEST',
    NEWEST: 'NEWEST'
}

function CommunityStoreContextProvider(props) {

    const [communityStore, setCommunityStore] = useState({
        top5lists: null,
        sortType: null,
        filter: null,
    });

    // Gives us access to the user
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch (type) {
            case CommunityStoreActionType.SET_LISTS: {
                return setCommunityStore({
                    top5lists: payload.top5lists,
                    sortType: communityStore.sortType,
                    filter: communityStore.filter,
                })
            }   
            case CommunityStoreActionType.SET_FILTER: {
                return setCommunityStore({
                    top5lists: communityStore.top5lists,
                    sortType: communityStore.sortType,
                    filter: payload.filter,
                })
            }
            case CommunityStoreActionType.SET_SORT_TYPE: {
                return setCommunityStore({
                    top5lists: communityStore.top5lists,
                    sortType: payload.sortType,
                    filter: communityStore.filter,
                })
            }
            default: {
                return communityStore;
            }
        }
    }

    // Reducer for sorting top5lists
    const sortTop5Lists = (top5lists) => {
        switch(communityStore.sortType) {

            case CommunityStoreSortType.LIKES: {
                break;
            }
            case CommunityStoreSortType.DISLIKES: {
                break;
            }
            case CommunityStoreSortType.VIEWS: {
                break;
            }
            case CommunityStoreSortType.OLDEST: {
                break;
            }
            // Default case is by most recently published
            default: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.lastUpdated > e2.lastUpdated) {
                        return -1
                    } else if (e1.lastUpdated < e2.lastUpdated) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
    }

    // Loads the top5lists to be displayed
    communityStore.loadLists = async function () {
        let response = await api.getAllCommunityTop5Lists();
        if (response && response.data.success) {
            // Gets the top5lists
            let top5lists = [];
            for (let i = 0; i < response.data.top5lists.length; i++) {
                let top5list = response.data.top5lists[i];
                let post = null;
                if (top5list.postId !== null) {
                    post = await api.getPostById(top5list.postId);
                }
                let items = Object.keys(top5list.itemCounts).sort((e1, e2) => {
                    if (top5list.itemCounts[e1] > top5list.itemCounts[e2]) {
                        return -1;
                    } else if (top5list.itemCounts[e2] > top5list.itemCounts[e1]) {
                        
                        return 1;
                    } else {
                        
                        return 0;
                    }
                })
                let top5items = items.slice(0, 5).map((item) => {
                    return { name: item, count: top5list.itemCounts[item] }
                });

                top5lists.push({ 
                    _id: top5list._id,
                    items: top5items,
                    community: top5list.community,
                    itemCounts: top5list.itemCounts,
                    lastUpdated: top5list.lastUpdated,
                    post: post === null ? null : post.data.post
                });
            }
            console.log('lists assembled')
            // Next we filter the lists. Filter === null, then accept all lists
            top5lists = top5lists.filter((top5list) => {
                return (communityStore.filter === null || 
                    top5list.community.toUpperCase().startsWith(communityStore.filter.toUpperCase()));
            });
            console.log('filteering lists')
            // Next we sort the top5lists based on the sortType
            top5lists = sortTop5Lists(top5lists);

            console.log('sorting lists)')
            // Set the lists
            storeReducer({
                type: CommunityStoreActionType.SET_LISTS,
                payload: {
                    top5lists: top5lists,
                }
            })
        }
    }   

    // Sets how the top5lists should be sorted
    communityStore.setSortType = async function (sortType) {
        storeReducer({
            type: CommunityStoreActionType.SET_SORT_TYPE,
            payload: {
                sortType: sortType
            }
        });
    }

    // Sets the filter for the top5lists
    communityStore.setFilter = async function (filter) {
        storeReducer({
            type: CommunityStoreActionType.SET_FILTER,
            payload: {
                filter: filter
            }
        });
    }

    // HANDLE UPDATING POSTS

    // Handles updating a post
    communityStore.updatePost = async function (postId, payload) {
        let response = await api.updatePost(postId, payload);
        if (response.data.success) {
            console.log("Reloading community lists");
            communityStore.loadLists();
        }
    }

    // Handles adding a view to a post
    communityStore.viewPost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            communityStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                comments: response.data.post.comments,
                views: response.data.post.views + 1,
            });
        }
    }

    // Handles liking a post.
    communityStore.likePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1);
            }
            response.data.post.likes.push(auth.user.id);
            communityStore.updatePost (postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });   
        }
    }

    // Handles disliking a post
    communityStore.dislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1);
            }
            response.data.post.dislikes.push(auth.user.id);
            communityStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    // Handles adding a comment to a post
    communityStore.postComment = async function (postId, text) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            response.data.post.comments.push({
                author: auth.user.firstName + " " + auth.user.lastName,
                text: text
            });
            communityStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    return (
        <CommunityStoreContext.Provider value={{
            communityStore
        }}>
            {props.children}
        </CommunityStoreContext.Provider>
    );
}

export default CommunityStoreContext;
export { CommunityStoreContextProvider };
