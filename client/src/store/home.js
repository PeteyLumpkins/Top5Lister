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
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case HomeStoreActionType.CLOSE_CURRENT_LIST: {
                return setHomeStore({
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                })
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
            // TODO handled by the view store
            case HomeStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setHomeStore({
                    currentList: null,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
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
                    currentList: payload,
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
                    isItemEditActive: payload.isEditActive,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case HomeStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setHomeStore({
                    currentList: payload,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            default:
                return homeStore;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    homeStore.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs(auth.user.email);
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: HomeStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
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
    homeStore.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: HomeStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    // Updating an item
    homeStore.updateItem = function (index, newItem) {
        homeStore.currentList.items[index] = newItem;
        homeStore.updateCurrentList();
    }

    // TODO probably something like saving it. Not sure yet
    homeStore.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(homeStore.currentList._id, homeStore.currentList);
        if (response.data.success) {
            storeReducer({
                type: HomeStoreActionType.SET_CURRENT_LIST,
                payload: homeStore.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    homeStore.setIsListNameEditActive = function () {
        storeReducer({
            type: HomeStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    homeStore.setIsItemEditActive = function (isEditActive) {
        storeReducer({
            type: HomeStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: { 
                isEditActive: isEditActive,
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