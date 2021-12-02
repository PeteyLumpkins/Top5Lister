import TextField from '@mui/material/TextField';

import { useContext } from 'react';
import { HomeStoreContext } from '../../../stores/HomeListsStore';

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