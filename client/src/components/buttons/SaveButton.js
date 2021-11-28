import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../store/home'

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