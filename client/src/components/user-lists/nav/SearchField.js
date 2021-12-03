import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { UserListsStoreContext } from '../../../stores/UserListsStore';

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