import { Fab } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { UserListsStoreContext } from '../../../stores/UserListsStore'
import { useContext } from 'react';

export default function DislikeButton(props) {

    const { userListsStore } = useContext(UserListsStoreContext);

    const handleClick = () => {
        userListsStore.dislikePost(props.postId);
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