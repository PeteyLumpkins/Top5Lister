import { createContext, useContext, useState } from 'react'
import api from '../api'

import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author PeteyLumpkins
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const HomeStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const HomeStoreActionType = {
    SET_LISTS: "SET_LISTS",

    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    SAVE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    PUBLISH_CURRENT_LIST: "PUBLISH_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE"
}

export const HomeStoreSortType = {
    NEWEST: 'NEWEST',
    OLDEST: 'OLDEST',
    VIEWS: 'VIEWS',
    LIKES: 'LIKES',
    DISLIKES: 'DISLIKES'
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function HomeStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [homeStore, setHomeStore] = useState({
        top5lists: null,
        sortType: null,
        filter: null,

        currentList: null,
        isListNameEditActive: false,
        isItemEditActive: false,
        listMarkedForDeletion: null,
    });

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case HomeStoreActionType.SET_LISTS: {
                return setHomeStore({
                    top5lists: payload.top5lists,
                    filter: payload.filter,
                    sortType: payload.sortType,

                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            case HomeStoreActionType.CHANGE_LIST_NAME: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: homeStore.currentList,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            case HomeStoreActionType.CREATE_NEW_LIST: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // PREPARE TO DELETE A LIST
            case HomeStoreActionType.MARK_LIST_FOR_DELETION: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case HomeStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case HomeStoreActionType.SET_CURRENT_LIST: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: payload.top5list,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST ITEM
            case HomeStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: homeStore.currentList,
                    isListNameEditActive: false,
                    isItemEditActive: payload.isEditing,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case HomeStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setHomeStore({
                    top5lists: homeStore.top5lists,
                    filter: homeStore.filter,
                    sortType: homeStore.sortType,

                    currentList: homeStore.currentList,
                    isListNameEditActive: payload.isEditing,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            default:
                return homeStore;
        }
    }

    // Reducer for sorting top5lists
    const sortTop5Lists = (top5lists, by = homeStore.sortType) => {
        console.log('Sorting by: ' + by);
        console.log(by === HomeStoreSortType.OLDEST);
        switch(by) {
            case HomeStoreSortType.LIKES: {
                return top5lists.sort((e1, e2) => { 
                    if (!e1.published && !e2.published) {
                        return 0;
                    } else if (!e1.published) {
                        return 1;
                    } else if (!e2.published) {
                        return -1;
                    } else if (e1.post.likes.length > e2.post.likes.length) {
                        return -1
                    } else if (e1.post.likes.length < e2.post.likes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            case HomeStoreSortType.DISLIKES: {
                return top5lists.sort((e1, e2) => { 
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
            }
            case HomeStoreSortType.VIEWS: {
                return top5lists.sort((e1, e2) => { 
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
            }
            case HomeStoreSortType.OLDEST: {
                console.log("Oldest?")
                return top5lists.sort((e1, e2) => { 
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
            }
            // Default case is by most recently published
            default: {
                return top5lists.sort((e1, e2) => { 
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
            }
        }
    }

    // Loads the top5lists to be displayed
    homeStore.loadLists = async function (sortType = homeStore.sortType, filter = homeStore.filter) {
        let response = await api.getUserTop5Lists();
        if (response && response.data.success) {
            let top5lists = [];
            // Gets the top5lists
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
            // Next we filter the lists. Filter === null, then accept all lists
            top5lists = top5lists.filter((top5list) => {
                return (filter === null || filter === "" || 
                    top5list.name.toUpperCase().startsWith(filter.toUpperCase()));
            });
            
            // Next we sort the top5lists based on the sortType
            top5lists = sortTop5Lists(top5lists, sortType);

            // Set the lists
            storeReducer({
                type: HomeStoreActionType.SET_LISTS,
                payload: {
                    top5lists: top5lists,
                    filter: filter,
                    sortType: sortType,
                }
            })
        }
    }   

    // THESE ARE ALL THE METHODS FOR UPDATING THE POST ASSOCIATED WITH
    // THE TOPTLISTS

    // Handles updating a post
    homeStore.updatePost = async function (postId, payload) {
        let response = await api.updatePost(postId, payload);
        if (response.data.success) {
            homeStore.loadLists();
        }
    }

    // Handles adding a view to a post
    homeStore.viewPost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            homeStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                comments: response.data.post.comments,
                views: response.data.post.views + 1,
            });
        }
    }

    // Handles liking a post.
    homeStore.likePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1);
            }
            response.data.post.likes.push(auth.user.id);
            homeStore.updatePost (postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });   
        }
    }

    // Handles unLiking a post.
    homeStore.unLikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1)
                homeStore.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                });
            }
        }
    }

    // Handles disliking a post
    homeStore.dislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let liked = response.data.post.likes.indexOf(auth.user.id);
            if (liked !== -1) {
                response.data.post.likes.splice(liked, 1);
            }
            response.data.post.dislikes.push(auth.user.id);
            homeStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    // Handles undisliking a post
    homeStore.unDislikePost = async function (postId) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            let disliked = response.data.post.dislikes.indexOf(auth.user.id);
            if (disliked !== -1) {
                response.data.post.dislikes.splice(disliked, 1)
                homeStore.updatePost(postId, {
                    likes: response.data.post.likes,
                    dislikes: response.data.post.dislikes,
                    views: response.data.post.views,
                    comments: response.data.post.comments,
                });
            }
        }
    }

    // Handles adding a comment to a post
    homeStore.postComment = async function (postId, text) {
        let response = await api.getPostById(postId);
        if (response.data.success) {
            response.data.post.comments.push({
                author: auth.user.userName,
                text: text
            });
            homeStore.updatePost(postId, {
                likes: response.data.post.likes,
                dislikes: response.data.post.dislikes,
                views: response.data.post.views,
                comments: response.data.post.comments,
            });
        }
    }

    // THESE ARE ALL THE CONTROLS FOR THINGS EXLUSIVE TO THE HOMESTORE
    // CREATING NEW LISTS, EDITING A LIST, DELETING A LIST, ETC

    // Creates a new list
    homeStore.createNewList = async function () {
        let payload = {
            userId: auth.user.id,
            author: auth.user.userName,
            name: "Untitled",
            items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        };
        const response = await api.createUserTop5List(payload);
        if (response.data.success) {
            // Basically just refresh the page
            homeStore.loadLists();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // Sets the list marked for deletion
    homeStore.markListForDeletion = async function (top5List) {
        console.log(top5List)
        storeReducer({
            type: HomeStoreActionType.MARK_LIST_FOR_DELETION,
            payload: top5List
        });
    }

    // Deletes the given list and the post associated with the list
    homeStore.deleteList = async function (listToDelete) {
        if (listToDelete.published !== null) {
            let response = await api.deletePost(listToDelete.post._id);
            if (response.data.success) {
                async function updateCommunityList() {
                    response = await api.removeFromCommunityTop5List(listToDelete.name, {items: listToDelete.items});
                    if (response.data.success && !response.data.list.itemCounts) {
                        let community = response.data.list.community;
                        response = await api.deletePost(response.data.list.postId);
                        if (response.data.success) {
                            response = await api.deleteCommunityTop5List(community);
                        }
                    }
                }
                updateCommunityList();
            }
        } 
        let response = await api.deleteUserTop5List(listToDelete._id);
        if (response.data.success) {
            homeStore.loadLists();
        }
        

    }

    // Deletes the marked list
    homeStore.deleteMarkedList = function () {
        homeStore.deleteList(homeStore.listMarkedForDeletion);
    }

    // Unmarks the list to delete
    homeStore.unmarkListForDeletion = function () {
        storeReducer({
            type: HomeStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // Setting the current list
    homeStore.setCurrentList = function (top5list) {
        storeReducer({
            type: HomeStoreActionType.SET_CURRENT_LIST,
            payload: {
                top5list: top5list
            }
        });
    }

    // Function handles updating the current lists items
    homeStore.updateCurrentListItem = function (index, newItem) {
        let currentList = homeStore.currentList;
        if (!newItem.trim()) {
            newItem = "Item " + (index + 1);
        }
        currentList.items[index] = newItem.trim();
        storeReducer({
            type: HomeStoreActionType.SET_CURRENT_LIST,
            payload: {
                top5list: currentList
            }
        });
    }

    // Function handles updating the current lists name
    homeStore.updateCurrentListName = async function (newName) {
        let currentList = homeStore.currentList;
        if (newName.trim() === "") {
            newName = "Untitled";
        }
        currentList.name = newName.trim();
        storeReducer({
            type: HomeStoreActionType.SET_CURRENT_LIST,
            payload: {
                top5list: currentList
            }
        })
    }

    // Function handles saving the current top5list
    homeStore.saveCurrentList = async function () {
        const response = await api.updateUserTop5List(homeStore.currentList._id, {
            name: homeStore.currentList.name,
            items: homeStore.currentList.items
        });
        if (response.data.success) {
            homeStore.loadLists();
        }
    }

    // Function handles publishing the current top5list
    homeStore.publishCurrentList = async function () {
        let response = await api.createPost({
            likes: [],
            dislikes: [],
            views: 0,
            comments: []
        });
        if (response.data.success) {
            response = await api.publishTop5List(homeStore.currentList._id, {
                postId: response.data.post._id
            });
            if (response.data.success) {
                async function updateCommunityList (communityName) {
                    let response = await api.getCommunityTop5List(communityName);
                    if (response.data.success && !response.data.list) {
                        // Create Community List
                        async function createCommunityList (name, items) {
                            let response = await api.createPost({
                                likes: [],
                                dislikes: [],
                                views: 0,
                                comments: []
                            });
                            if (response.data.success) {
                                response = await api.createCommunityTop5List({
                                    community: name,
                                    postId: response.data.post._id,
                                    items: items
                                });
                                if (response.data.success) {
                                    homeStore.saveCurrentList();
                                }
                            }
                        }
                        createCommunityList(communityName, homeStore.currentList.items);

                    } else if (response.data.success) {
                        // Add to community list
                        async function updateCommunityList (name, items) {
                            let response = await api.addToCommunityTop5List(
                                name, {items: items}
                            );
                            if (response.data.success) {
                                homeStore.saveCurrentList();
                            }
                        }
                        updateCommunityList(communityName, homeStore.currentList.items);
                    }
                }
                updateCommunityList(homeStore.currentList.name);
            }
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    homeStore.setIsListNameEditActive = function (isEditing) {
        storeReducer({
            type: HomeStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: {
                isEditing: isEditing
            }
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    homeStore.setIsItemEditActive = function (isEditing) {
        storeReducer({
            type: HomeStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: {
                isEditing: isEditing
            }
        });
    }

    return (
        <HomeStoreContext.Provider value={{
            homeStore
        }}>
            {props.children}
        </HomeStoreContext.Provider>
    );
}

export default HomeStoreContext;
export { HomeStoreContextProvider };