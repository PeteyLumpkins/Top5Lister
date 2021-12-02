import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { UserListsStoreContext } from '../../../stores/UserListsStore'
import { useContext } from 'react';

export default function LikeButton(props) {

    const { userListsStore } = useContext(UserListsStoreContext);

    const handleClick = () => {
        userListsStore.likePost(props.postId);
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