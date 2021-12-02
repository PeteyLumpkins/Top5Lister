import { Fab } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { AllListsStoreContext } from '../../../stores/AllListsStore'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { allListsStore } = useContext(AllListsStoreContext);

    const handleClick = () => {
        allListsStore.dislikePost(props.postId);
    }

    return (
        <Fab
            color="primary"
            size="small"
            disabled={props.disabled}
            onClick={handleClick}
        >
            <ThumbDownIcon></ThumbDownIcon>
        </Fab>
    );
}