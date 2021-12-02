import { createContext, useContext, useState } from 'react'
import api from '../api'

import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author PeteyLumpkins
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const AllListsStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const AllListsStoreActionType = {
    SET_LISTS: "SET_LISTS",
    SET_FILTER: "SET_FILTER",
    SET_SORT_TYPE: "SET_SORT_TYPE",
}

export const AllListsStoreSortType = {
    LIKES: 'LIKES',
    DISLIKES: 'DISLIKES',
    VIEWS: 'VIEWS',
    OLDEST: 'OLDEST',
    NEWEST: 'NEWEST'
}

function AllListsStoreContextProvider(props) {

    const [allListsStore, setAllListsStore] = useState({
        top5lists: null,
        sortType: null,
        filter: null,
    });

    // Gives us access to the user
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch (type) {
            case AllListsStoreActionType.SET_LISTS: {
                return setAllListsStore({
                    top5lists: payload.top5lists,
                    sortType: allListsStore.sortType,
                    filter: allListsStore.filter,
                })
            }   
            case AllListsStoreActionType.SET_FILTER: {
                return setAllListsStore({
                    top5lists: allListsStore.top5lists,
                    sortType: allListsStore.sortType,
                    filter: payload.filter,
                })
            }
            case AllListsStoreActionType.SET_SORT_TYPE: {
                return setAllListsStore({
                    top5lists: allListsStore.top5lists,
                    sortType: payload.sortType,
                    filter: allListsStore.filter,
                })
            }
            default: {
                return allListsStore;
            }
        }
    }

    // Reducer for sorting top5lists
    const sortTop5Lists = (top5lists) => {
        switch(allListsStore.sortType) {

            case AllListsStoreSortType.LIKES: {
                break;
            }
            case AllListsStoreSortType.DISLIKES: {
                break;
            }
            case AllListsStoreSortType.VIEWS: {
                break;
            }
            case AllListsStoreSortType.OLDEST: {
                break;
            }
            // Default case is by most recently published
            default: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.published > e2.published) {
                        return -1
                    } else if (e1.published < e2.published) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
    }

    // Loads the top5lists to be displayed
    allListsStore.loadLists = async function () {
        let response = await api.getTop5Lists();
        if (response && response.data.success) {
            // Gets the top5lists
            let top5lists = [];
            for (let i = 0; i < response.data.top5lists.length; i++) {
                let top5list = response.data.top5lists[i];
                let post = null;
                if (top5list.postId !== null) {
                    post = await api.getPostById(top5list.postId);
                }

                top5lists.push({ 
                    _id: top5list._id,
                    userId: top5list.userId,
                    name: top5list.name,
                    author: top5list.author,
                    items: top5list.items,
                    published: top5list.published,
                    post: post === null ? null : post.data.post
                });
            }
            console.log('lists assembled')
            // Next we filter the lists. Filter === null, then accept all lists
            top5lists = top5lists.filter((top5list) => {
                return (allListsStore.filter === null || top5list.name === allListsStore.filter);
            });
            console.log('filteering lists')
            // Next we sort the top5lists based on the sortType
            top5lists = sortTop5Lists(top5lists);

            console.log('sorting lists)')
            // Set the lists
            storeReducer({
                type: AllListsStoreActionType.SET_LISTS,
                payload: {
                    top5lists: top5lists,
                }
            })
        }
    }   

    // Sets how the top5lists should be sorted
    allListsStore.setSortType = async function (sortType) {
        storeReducer({
            type: AllListsStoreActionType.SET_SORT_TYPE,
            payload: {
                sortType: sortType
            }
        });
    }

    // Sets the filter for the top5lists
    allListsStore.setFilter = async function (filter) {
        storeReducer({
            type: AllListsStoreActionType.SET_FILTER,
            payload: {
                filter: filter
            }
        });
    }

    // HANDLE UPDATING POSTS

    // Handles updating a post
    allListsStore.updatePost = async function (postId, payload) {
        let response = await api.updatePost(postId, payload);
        if (response.data.success) {
            console.log("Reloading community lists");
            allListsStore.loadLists();
        }
    }

    // Handles adding a view to a post
    allListsStore.viewPost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            allListsStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                comments: response.data.post.comments,
                views: response.data.post.views + 1,
            });
        }
    }

    // Handles liking a post.
    allListsStore.likePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1);
            }
            response.data.post.likes.push(auth.user.id);
            allListsStore.updatePost (postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });   
        }
    }

    // Handles disliking a post
    allListsStore.dislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1);
            }
            response.data.post.dislikes.push(auth.user.id);
            allListsStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    // Handles adding a comment to a post
    allListsStore.postComment = async function (postId, text) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            response.data.post.comments.push({
                author: auth.user.firstName + " " + auth.user.lastName,
                text: text
            });
            allListsStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    return (
        <AllListsStoreContext.Provider value={{
            allListsStore
        }}>
            {props.children}
        </AllListsStoreContext.Provider>
    );
}

export default AllListsStoreContext;
export { AllListsStoreContextProvider };