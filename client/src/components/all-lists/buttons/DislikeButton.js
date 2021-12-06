import { Fab, IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import { AllListsStoreContext } from '../../../stores/AllListsStore'
import { useContext } from 'react';

/**
 * Button that handles disliking a top5list on the all-lists screen.
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disliked - whether the current user disliked the list or not
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
export default function DislikeButton(props) {

    const { allListsStore } = useContext(AllListsStoreContext);

    const handleClick = () => {
        if (props.disliked) {
            allListsStore.unDislikePost(props.postId);
        } else {
            allListsStore.dislikePost(props.postId);
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