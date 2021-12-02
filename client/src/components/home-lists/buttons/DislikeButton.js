import { Fab } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import {HomeStoreContext} from '../../../stores/HomeListsStore'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.dislikePost(props.postId);
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