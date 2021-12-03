import { IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import {HomeStoreContext} from '../../../stores/HomeListsStore'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        if (props.disliked) {
            homeStore.unDislikePost(props.postId);
        } else {
            homeStore.dislikePost(props.postId);
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