import { Fab } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { HomeStoreContext } from '../../../stores/HomeListsStore'
import { useContext } from 'react';

/**
 * Button for marking a top5list for deletion and triggering the delete list modal.
 * @author PeteyLumpkins
 * 
 * @param {Object} props.top5list - the top5list to be marked for deletion
 */
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