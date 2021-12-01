import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import AuthContext from '../auth'
import api from '../api/index'

export const ViewStoreContext = createContext({});

export const ViewStoreActionType = {
    SET_PAGE: 'SET_PAGE',
    SET_TOP5LISTS: 'SET_TOP5LISTS',
    SET_SORT_BY: 'SET_SORT_BY',
    SET_FILTER: 'SET_FILTER'
}

export const ViewStorePageType = {
    HOME: 'HOME',
    USERS: 'USERS',
    COMMUNITY: 'COMMUNITY',
    ALL: 'ALL'
}

export const ViewStoreSortType = {
    LIKES: 'LIKES',
    DISLIKES: 'DISLIKES',
    VIEWS: 'VIEWS',
    NEWEST: 'NEWEST',
    OLDEST: 'OLDEST',
}

function ViewStoreContextProvider(props) {

    const [viewStore, setViewStore] = useState({
        top5lists: null,
        page: null,
        sortBy: ViewStoreSortType.NEWEST,
        filter: null
    })
    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const viewStoreReducer = (action) => {
        const {type, payload} = action;

        switch(type) {

            case ViewStoreActionType.SET_PAGE: {
                return setViewStore({
                    top5lists: payload.top5lists,
                    page: payload.page,
                    sortBy: viewStore.sortBy,
                    filter: viewStore.filter
                });
            }

            case ViewStoreActionType.SET_TOP5LISTS: {
                return setViewStore({
                    top5lists: payload.top5lists,
                    page: viewStore.page,
                    sortBy: viewStore.sortBy,
                    filter: viewStore.filter
                });
            }

            case ViewStoreActionType.SET_SORT_BY: {
                return setViewStore({
                    top5lists: viewStore.top5lists,
                    page: viewStore.page,
                    sortBy: payload.sortBy,
                    filter: viewStore.filter
                });
            }

            default: {
                return viewStore;
            }
        }
    }
     
    viewStore.loadPage = async function (pageType) {
        let response;
        switch(pageType) {
            case ViewStorePageType.HOME: {
                response = await api.getUserTop5Lists();
                if (response && response.data.success) {
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
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: pageType,
                            top5lists: top5lists
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.COMMUNITY: {
                response = await api.getAllCommunityTop5Lists();
                if (response && response.data.success) {
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
                    
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: pageType,
                            top5lists: top5lists
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.USERS: {
                response = await api.getTop5Lists();
                if (response && response.data.success) {
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
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: pageType,
                            top5lists: top5lists
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.ALL: {
                response = await api.getTop5Lists();
                if (response && response.data.success) {
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
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: pageType,
                            top5lists: top5lists
                        }
                    });
                }
                break;
            }
            default: {
                viewStoreReducer({
                    type: ViewStoreActionType.SET_PAGE,
                    payload: {
                        page: null,
                        top5lists: null
                    }
                });
                break;
            }
        }
    }

    viewStore.sortLists = function (sortType) {
        let top5lists;
        console.log("sorting")
        switch(sortType) {
            case ViewStoreSortType.LIKES: {
                console.log("sorting liikes")
                top5lists = viewStore.top5lists.sort((e1, e2) => {
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.post) {
                        return 1;
                    } else if (!e2.post) {
                        return -1;
                    } else if (e1.post.likes.length > e2.post.likes.length) {
                        return -1
                    } else if (e1.post.likes.length < e2.post.likes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                console.log(top5lists);
                break;
            }
            case ViewStoreSortType.DISLIKES: {
                top5lists = viewStore.top5lists.sort((e1, e2) => {
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.published) {
                        return 1;
                    } else if (!e2.published) {
                        return -1;
                    } else if (e1.post.dislikes.length > e2.post.dislikes.length) {
                        return -1
                    } else if (e1.post.dislikes.length < e2.post.dislikes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            }
            case ViewStoreSortType.VIEWS: {
                top5lists = viewStore.top5lists.sort((e1, e2) => {
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.published) {
                        return 1;
                    } else if (!e2.published) {
                        return -1;
                    } else if (e1.post.views > e2.post.views) {
                        return -1
                    } else if (e1.post.views < e2.post.views) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            }
            case ViewStoreSortType.NEWEST: {
                top5lists = viewStore.top5lists.sort((e1, e2) => { 
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.published) {
                        return 1;
                    } else if (!e2.published) {
                        return -1;
                    } else if (e1.published > e2.published) {
                        return -1
                    } else if (e1.published < e2.published) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            }
            case ViewStoreSortType.OLDEST: {
                top5lists = viewStore.top5lists.sort((e1, e2) => { 
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.published) {
                        return 1;
                    } else if (!e2.published) {
                        return -1;
                    } else if (e1.published > e2.published) {
                        return 1
                    } else if (e1.published < e2.published) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                break;
            }
            default: {

                break;
            }
        }
        viewStoreReducer({
            type: ViewStoreActionType.SET_TOP5LISTS,
            payload: {
                top5lists: top5lists
            }
        });
    }

    // Handles adding a view to a post
    viewStore.viewPost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            async function updatePost() {
                response = await api.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    comments: response.data.post.comments,
                    views: response.data.post.views + 1,
                });
                if (response.data.success) {
                    viewStore.loadPage(viewStore.page);
                }
            }
            updatePost();
        }
    }

    // Handles liking a post.
    viewStore.likePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1);
            }
            response.data.post.likes.push(auth.user.id);
            async function updatePost () {
                response = await api.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                })
                if (response.data.success) {
                    viewStore.loadPage(viewStore.page);
                }
            }
            updatePost();
        }
        // 1.) Get the post to like
        // 2.) Check dislikes doesn't contain userName ?? - might be able to do before
        // 3.) Add like to posts likes
        // 4.) Update the post
        // 5.) Reload the lists... 
    }

    // Handles disliking a post
    viewStore.dislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1);
            }
            response.data.post.dislikes.push(auth.user.id);
            async function updatePost() {
                response = await api.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                });
                if (response.data.success) {
                    viewStore.loadPage(viewStore.page);
                }
            }
            updatePost();

        }
        // 1.) Get the post to dislike
        // 2.) Check likes doesn't contain userName ?? - might be able to do before
        // 3.) Add dislike to posts dislikes
        // 4.) Update the post
        // 5.) Reload the lists... expensive
    }

    // Handles adding a comment to a post
    viewStore.postComment = async function (postId, text) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            async function updatePost() {
                response.data.post.comments.push({
                    author: auth.user.firstName + " " + auth.user.lastName,
                    text: text
                });
                response = await api.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments
                });
                if (response.data.success) {
                    viewStore.loadPage(viewStore.page);
                }
            }
            updatePost();
        }
    }

    return (
        <ViewStoreContext.Provider value={{
            viewStore
        }}>
            {props.children}
        </ViewStoreContext.Provider>
    );
}

export default ViewStoreContext;
export { ViewStoreContextProvider };

