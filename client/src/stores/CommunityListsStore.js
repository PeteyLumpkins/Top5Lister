import { createContext, useContext, useState } from 'react'
import api from '../api'

import AuthContext from '../auth'
/*
    This is the community lists store. It manages all state associated with the
    community top5lists page.
    
    @author PeteyLumpkins
*/

// Context for sharing the community lists store
export const CommunityStoreContext = createContext({});

// All ways to update the state of the community lists store
export const CommunityStoreActionType = {
    SET_LISTS: "SET_LISTS",
}

// All ways we can sort the community stores top5lists
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
                    sortType: payload.sortType,
                    filter: payload.filter,
                })
            }   
            default: {
                return communityStore;
            }
        }
    }

    // Reducer for sorting top5lists
    const sortTop5Lists = (top5lists, by = communityStore.sortType) => {
        switch(by) {
            case CommunityStoreSortType.LIKES: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.post.likes.length > e2.post.likes.length) {
                        return -1;
                    } else if (e1.post.likes.length < e2.post.likes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            case CommunityStoreSortType.DISLIKES: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.post.dislikes.length > e2.post.dislikes.length) {
                        return -1
                    } else if (e1.post.dislikes.length < e2.post.dislikes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            case CommunityStoreSortType.VIEWS: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.post.views > e2.post.views) {
                        return -1
                    } else if (e1.post.views < e2.post.views) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            case CommunityStoreSortType.OLDEST: {
                return top5lists.sort((e1, e2) => { 
                    if (e1.lastUpdated > e2.lastUpdated) {
                        return 1
                    } else if (e1.lastUpdated < e2.lastUpdated) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
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
    communityStore.loadLists = async function (sortType = communityStore.sortType, filter = communityStore.filter) {
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
            // Next we filter the lists. Filter === null, then accept all lists
            top5lists = top5lists.filter((top5list) => {
                return (filter === null || filter === "" ||
                    top5list.community.toUpperCase().startsWith(filter.toUpperCase()));
            });
            // Next we sort the top5lists based on the sortType
            top5lists = sortTop5Lists(top5lists, sortType);

            // Set the lists
            storeReducer({
                type: CommunityStoreActionType.SET_LISTS,
                payload: {
                    top5lists: top5lists,
                    filter: filter,
                    sortType: sortType,
                }
            })
        }
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

    // Handles unliking a post
    communityStore.unLikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1)
                communityStore.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                });
            }
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

    // Handles unDisliking a post
    communityStore.unDislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1)
                communityStore.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                });
            }
        }
    }

    // Handles adding a comment to a post
    communityStore.postComment = async function (postId, text) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            response.data.post.comments.push({
                author: auth.user.userName,
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
