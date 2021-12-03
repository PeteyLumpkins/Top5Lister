import { IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { CommunityStoreContext } from '../../../stores/CommunityListsStore'
import { useContext } from 'react';

export default function LikeButton(props) {

    const { communityStore } = useContext(CommunityStoreContext);

    const handleClick = () => {
        if (props.liked) {
            communityStore.unLikePost(props.postId);
        } else {
            communityStore.likePost(props.postId);
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
    );
}