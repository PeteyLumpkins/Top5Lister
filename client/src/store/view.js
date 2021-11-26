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
        switch(pageType) {
            case ViewStorePageType.HOME: {
                console.log("Getting users lists");
                let response = await api.getUserTop5Lists();
                console.log(response)
                if (response.data.success) {
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: ViewStorePageType.HOME,
                            top5lists: response.data.top5lists,
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.COMMUNITY: {
                let response = await api.getAllCommunityTop5Lists();
                if (response.data.success) {
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: ViewStorePageType.COMMUNITY,
                            top5lists: response.data.top5lists
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.USERS: {
                let response = await api.getTop5Lists();
                if (response.data.success) {
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: ViewStorePageType.ALL,
                            top5lists: response.data.top5lists
                        }
                    });
                }
                break;
            }
            case ViewStorePageType.ALL: {
                let response = await api.getTop5Lists();
                if (response.data.success) {
                    viewStoreReducer({
                        type: ViewStoreActionType.SET_PAGE,
                        payload: {
                            page: ViewStorePageType.ALL,
                            top5lists: response.data.top5lists
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

    viewStore.viewPost = async function (postId) {

    }

    viewStore.likePost = async function (postId, userName) {
        // 1.) Get the post to like
        // 2.) Check dislikes doesn't contain userName ?? - might be able to do before
        // 3.) Add like to posts likes
        // 4.) Update the post
        // 5.) Reload the lists... 
    }

    viewStore.dislikePost = async function (postId, userName) {
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

