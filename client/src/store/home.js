import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'

import AuthContext from '../auth'
import { ViewStoreContext } from './view'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
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

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function HomeStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [homeStore, setHomeStore] = useState({
        top5lists: null,
        sortBy: null,
        filter: null,

        currentList: null,
        isListNameEditActive: false,
        isItemEditActive: false,
        listMarkedForDeletion: null,
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    const { viewStore } = useContext(ViewStoreContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case HomeStoreActionType.CHANGE_LIST_NAME: {
                return setHomeStore({
                    currentList: homeStore.currentList,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            case HomeStoreActionType.CREATE_NEW_LIST: {
                return setHomeStore({
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
            }
            // PREPARE TO DELETE A LIST
            case HomeStoreActionType.MARK_LIST_FOR_DELETION: {
                return setHomeStore({
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case HomeStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setHomeStore({
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case HomeStoreActionType.SET_CURRENT_LIST: {
                return setHomeStore({
                    currentList: payload.top5list,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST ITEM
            case HomeStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setHomeStore({
                    currentList: homeStore.currentList,
                    isListNameEditActive: false,
                    isItemEditActive: payload.isEditing,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case HomeStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setHomeStore({
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

    // THIS FUNCTION CREATES A NEW LIST
    homeStore.createNewList = async function () {
        let payload = {
            userId: auth.user.id,
            author: (auth.user.firstName + " " + auth.user.lastName),
            name: "Untitled",
            items: ["?", "?", "?", "?", "?"],
        };
        const response = await api.createUserTop5List(payload);
        if (response.data.success) {
            // Basically just refresh the page
            viewStore.loadPage(viewStore.page);
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
            viewStore.loadPage(viewStore.page);
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
        console.log("Settiing current lsit");
        console.log(top5list)
        storeReducer({
            type: HomeStoreActionType.SET_CURRENT_LIST,
            payload: {
                top5list: top5list
            }
        });
        console.log(homeStore.currentList);
    }

    // Function handles updating the current lists items
    homeStore.updateCurrentListItem = function (index, newItem) {
        homeStore.currentList.items[index] = newItem;
    }

    // Function handles updating the current lists name
    homeStore.updateCurrentListName = async function (newName) {
        homeStore.currentList.name = newName;
    }

    // Function handles saving the current top5list
    homeStore.saveCurrentList = async function () {
        console.log(homeStore.currentList);
        const response = await api.updateUserTop5List(homeStore.currentList._id, {
            name: homeStore.currentList.name,
            items: homeStore.currentList.items
        });
        if (response.data.success) {
            storeReducer({
                type: HomeStoreActionType.SET_CURRENT_LIST,
                payload: {
                    top5list: null
                }
            });
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
                        console.log("Creating community list and post")
                        async function createCommunityList (name, items) {
                            let response = await api.createPost({
                                likes: [],
                                dislikes: [],
                                views: 0,
                                comments: []
                            });
                            if (response.data.success) {
                                console.log("Creating community list")
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