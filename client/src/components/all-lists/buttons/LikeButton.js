import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { AllListsStoreContext } from '../../../stores/AllListsStore'
import { useContext } from 'react';

export default function LikeButton(props) {

    const { allListsStore } = useContext(AllListsStoreContext);

    const handleClick = () => {
        allListsStore.likePost(props.postId);
    }

    return (
        <Fab
            onClick={handleClick}
            disabled={props.disabled}
            color="primary"
            size="small"
        >
            <ThumbUpIcon></ThumbUpIcon>
        </Fab>
    )
}