import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { HomeStoreContext } from '../../../store/home'
import { useContext } from 'react';


export default function LikeButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.likePost(props.postId);
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