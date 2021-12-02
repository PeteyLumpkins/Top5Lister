import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { CommunityStoreContext } from '../../../stores/CommunityListsStore';

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