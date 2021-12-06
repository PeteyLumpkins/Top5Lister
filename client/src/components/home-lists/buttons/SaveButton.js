import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore'

/**
 * Button for saving a top5list being edited in the workspace on the users HomeListsScreen
 * @author PeteyLumpkins
 */
export default function SaveButton() {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.saveCurrentList();
    }

    let disabled = homeStore.isItemEditActive || homeStore.isListNameEditActive

    return (
        <Button
            sx={{
                border: 1, borderColor: disabled ? 'lightgray' : 'black',
                color: disabled ? 'lightgray' : 'black', fontWeight: 'bold',
                textTransform: 'none', width: "40%"
            
            }}
            disabled={disabled}
            onClick={handleClick}
        >
            Save
        </Button>
    );
}