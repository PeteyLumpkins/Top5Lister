import { useContext } from 'react';
import { HomeStoreContext } from '../../stores/HomeListsStore';

import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function AddListButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.createNewList();
    }

    return (
        <Fab 
            color="primary" 
            disabled={homeStore.currentList !== null}
            aria-label="add"
            size='small'
            onClick={handleClick}
            id="add-list-button"
        >
            <AddIcon />
        </Fab>
    );
}