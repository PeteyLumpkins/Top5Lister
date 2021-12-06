import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { CommunityStoreContext } from '../../../stores/CommunityListsStore';

/**
 * Searchfield for the CommunityListsScreen. Searches for community lists starting with the
 * provided text (case insensitive)
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the searchfield should be disabled or not
 */
export default function SearchField(props) {

    const { communityStore } = useContext(CommunityStoreContext)

    const handleKeyPress = (event) => { 
        if (event.code === 'Enter') {
            communityStore.loadLists(communityStore.sortType, event.target.value);
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