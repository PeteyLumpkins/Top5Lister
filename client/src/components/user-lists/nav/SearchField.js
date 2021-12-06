import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { UserListsStoreContext } from '../../../stores/UserListsStore';

/**
 * The searchfield for the UserListsScreen. Searches for lists by usernames 
 * (case-insensitive) starting with the given text. 
 * 
 * @author PeteyLumpkins
 * 
 * @param {*} props.disabled - whether the search field should be disabled or not
 */
export default function SearchField(props) {

    const { userListsStore } = useContext(UserListsStoreContext)

    const handleKeyPress = (event) => { 
        if (event.code === 'Enter') {
            userListsStore.loadLists(userListsStore.sortType, event.target.value);
        }
    }

    return ( 
        <TextField
            onKeyPress={(ev) => handleKeyPress(ev)}
            disabled={props.disabled}
            sx={{background: "white", width: "50%"}}
            variant="standard"
        />
   );
}