import { IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import {HomeStoreContext} from '../../../stores/HomeListsStore'
import { useContext } from 'react';

/**
 * Button for disliking a top5list on the user's HomeListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disliked - whether the user has disliked the top5list or not
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
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