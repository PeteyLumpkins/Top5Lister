import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { AllListsStoreContext } from '../../../stores/AllListsStore';

/**
 * Searchfield for the navbar on the all-lists screen. Searches for toplists that have a name
 * that starts with the provided text (case insensitive)
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
export default function SearchField(props) {

    const { allListsStore } = useContext(AllListsStoreContext)

    const handleKeyPress = (event) => { 
        if (event.code === 'Enter') {
            allListsStore.loadLists(allListsStore.sortType, event.target.value);
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