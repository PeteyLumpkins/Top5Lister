import { Fab } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import {CommunityStoreContext} from '../../../store/community'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { communityStore } = useContext(CommunityStoreContext);

    const handleClick = () => {
        communityStore.dislikePost(props.postId);
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