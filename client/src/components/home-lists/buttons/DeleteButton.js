import { Fab } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { HomeStoreContext } from '../../../stores/HomeListsStore'
import { useContext } from 'react';

export default function DeleteButton(props) {
    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.markListForDeletion(props.top5list);
    }
    
    return (
        <Fab
            color="primary"
            size="small"
            onClick={handleClick}
        >
            <DeleteIcon></DeleteIcon>
        </Fab>
    );
}