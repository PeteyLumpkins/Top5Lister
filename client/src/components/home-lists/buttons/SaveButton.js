import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore'

export default function SaveButton() {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.saveCurrentList();
    }

    return (
        <Button
            color="primary"
            disabled={homeStore.isItemEditActive || homeStore.isListNameEditActive}
            onClick={handleClick}
        >
            Save
        </Button>
    );
}