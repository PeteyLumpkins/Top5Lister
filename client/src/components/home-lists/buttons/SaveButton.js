import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore'

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