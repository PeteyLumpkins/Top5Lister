import { Fab, IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { AllListsStoreContext } from '../../../stores/AllListsStore'
import { useContext } from 'react';

export default function LikeButton(props) {

    const { allListsStore } = useContext(AllListsStoreContext);

    const handleClick = () => {
        if (props.liked) {
            allListsStore.unLikePost(props.postId);
        } else {
            allListsStore.likePost(props.postId);
        }
    }

    let color = props.liked ? "#4caf50" : "gray"
    return (
        <IconButton
            size="medium"
            disabled={props.disabled}
            onClick={handleClick}
        >
           {props.liked ? 
            <ThumbUpIcon sx={{color: color}}></ThumbUpIcon> :
            <ThumbUpOffAltIcon sx={{color: color}}></ThumbUpOffAltIcon>
           }
        </IconButton>
    )
}