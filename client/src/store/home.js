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
            // TODO changing list name happens through updating currentlist
            case HomeStoreActionType.CHANGE_LIST_NAME: {
                return setHomeStore({
                    currentList: homeStore.currentList,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // TODO current list in the payload
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
                console.log("Setting in reducer?")
                console.log(payload.top5list);
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

    // TODO will save the current list
    homeStore.closeCurrentList = function () {
        storeReducer({
            type: HomeStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    homeStore.createNewList = async function () {
        console.log("Creating new list");
        console.log(auth.user)
        let payload = {
            userId: auth.user.id,
            author: (auth.user.firstName + " " + auth.user.lastName),
            name: "Untitled",
            items: ["?", "?", "?", "?", "?"],
        };
        console.log(payload)
        const response = await api.createUserTop5List(payload);
        if (response.data.success) {
            // Basically just refresh the page
            console.log("Refreshing the page");
            viewStore.loadPage(viewStore.page);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    homeStore.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: HomeStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    homeStore.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            homeStore.loadIdNamePairs();
            history.push("/");
        }
    }

    homeStore.deleteMarkedList = function () {
        homeStore.deleteList(homeStore.listMarkedForDeletion);
    }

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