import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";
import { CommunityStoreContext } from '../../../store/community'
import AuthContext from '../../../auth';
import { useContext } from 'react';

import TextField from '@mui/material/TextField';

export default function CommentDropdownCard(props) {

    const { communityStore } = useContext(CommunityStoreContext);
    const { auth } = useContext(AuthContext);

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            communityStore.postComment(props.postId, event.target.value)
        }
    }

    return(

    <Box sx={{height: "100%", maxHeight: "100%", overflow: 'scroll'}}>
        <List sx={{height: "80%", maxHeight: "150px", overflow: 'scroll'}}>
            {props.comments.map((comment) => (
                <Comment author={comment.author} text={comment.text} />
            ))}
        </List>
        <Box sx={{width: "100%", height: "20%"}}>
            <TextField 
                sx={{ width: "100%"}} 
                disabled={auth.user === null}
                label={auth.user !== null ? "Add Comment" : "Login to comment on Community Top5Lists!"} 
                variant="standard"
                onKeyPress={(event) => { handleKeyPress(event); }}
            >Add Comment</TextField>
        </Box>
    </Box>
        
    );
}