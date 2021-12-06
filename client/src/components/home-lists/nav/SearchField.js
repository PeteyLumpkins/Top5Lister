import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { HomeStoreContext } from '../../../stores/HomeListsStore';

/**
 * SearchField for the HomeListsPage. Searches for all top5lists with a name that starts with
 * whatever is entered into the search field (case-insensitive).
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the search field should be disabled or not
 */
export default function SearchField(props) {

    const { homeStore } = useContext(HomeStoreContext)

    const handleKeyPress = (event) => { 
        if (event.code === 'Enter') {
            homeStore.loadLists(homeStore.sortType, event.target.value);
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