import { Fab } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import {ViewStoreContext} from '../../stores/view'
import { useContext, useState } from 'react';

export default function DislikeButton(props) {

    const { viewStore } = useContext(ViewStoreContext);

    const handleClick = () => {
        viewStore.dislikePost(props.postId);
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