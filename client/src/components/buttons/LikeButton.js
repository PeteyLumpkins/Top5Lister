import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {ViewStoreContext} from '../../stores/view'
import { useContext } from 'react';


export default function LikeButton(props) {

    const { viewStore } = useContext(ViewStoreContext);

    const handleClick = () => {
        viewStore.likePost(props.postId);
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