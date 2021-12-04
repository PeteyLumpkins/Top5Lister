import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";
import { CommunityStoreContext } from '../../../stores/CommunityListsStore'
import AuthContext from '../../../auth';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

export default function CommentDropdownCard(props) {

    const { communityStore } = useContext(CommunityStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

    const handleChange = (event) => { 
        setText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            communityStore.postComment(props.postId, event.target.value)
            setText("");
        }
    }

    return(

    <Box sx={{height: "100%", maxHeight: "100%", overflow: 'scroll'}}>
        <List sx={{height: "80%", maxHeight: "175px", overflow: 'scroll'}}>
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
                value={text}
                onKeyPress={(event) => { handleKeyPress(event); }}
                onChange={(event) => { handleChange(event); }}
            ></TextField>
        </Box>
    </Box>
        
    );
}