import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {CommunityStoreContext} from '../../../stores/CommunityListsStore'
import { useContext } from 'react';

export default function LikeButton(props) {

    const { communityStore } = useContext(CommunityStoreContext);

    const handleClick = () => {
        communityStore.likePost(props.postId);
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