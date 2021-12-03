import { IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import { UserListsStoreContext } from '../../../stores/UserListsStore'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { userListsStore } = useContext(UserListsStoreContext);

    const handleClick = () => {
        if (props.disliked) {
            userListsStore.unDislikePost(props.postId);
        } else {
            userListsStore.dislikePost(props.postId);
        }
    }

    let color = props.disliked ? "#ef5350" : "gray";
    return (
        <IconButton
            size="medium"
            disabled={props.disabled}
            onClick={handleClick}
        >
           {props.disliked ? 
            <ThumbDownIcon sx={{color: color}}></ThumbDownIcon> :
            <ThumbDownOffAltIcon sx={{color: color}}></ThumbDownOffAltIcon>
           }
        </IconButton>
    );
}