import { IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import {CommunityStoreContext} from '../../../stores/CommunityListsStore'
import { useContext } from 'react';

/**
 * Button for disliking a CommunityTop5List
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disliked - whether the current user has disliked the list or not
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
export default function DislikeButton(props) {

    const { communityStore } = useContext(CommunityStoreContext);

    const handleClick = () => {
        if (props.disliked) {
            communityStore.unDislikePost(props.postId);
        } else {
            communityStore.dislikePost(props.postId);
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