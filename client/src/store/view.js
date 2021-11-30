import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import AuthContext from '../auth'
import api from '../api/index'

export const ViewStoreContext = createContext({});

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
    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const viewStoreReducer = (action) => {
        const {type, payload} = action;

        switch(type) {

            case ViewStoreActionType.SET_PAGE: {
                return setViewStore({
                    top5lists: payload.top5lists,
                    page: payload.page
                });
            }

            case ViewStoreActionType.SET_TOP5LISTS: {
                return setViewStore({
                    top5lists: payload.top5lists,
                    page: viewStore.page
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
                break;
            }
            case ViewStorePageType.COMMUNITY: {
                response = await api.getAllCommunityTop5Lists();
                break;
            }
            case ViewStorePageType.USERS: {
                response = await api.getTop5Lists();
                break;
            }
            case ViewStorePageType.ALL: {
                response = await api.getTop5Lists();
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
                    name: top5list.name,
                    author: top5list.author,
                    items: top5list.items,
                    published: top5list.published,
                    post: post === null ? null : post.data.post
                });
            }
            console.log(top5lists);
            viewStoreReducer({
                type: ViewStoreActionType.SET_PAGE,
                payload: {
                    page: pageType,
                    top5lists: top5lists
                }
            });
        }
    }

    viewStore.viewPost = async function (postId) {

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

    viewStore.postComment = async function (postId, userName, text) {
        // 1.) Get the post to add the comment to
        // 2.) 
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

