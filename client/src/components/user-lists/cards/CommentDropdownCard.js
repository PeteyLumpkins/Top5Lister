import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";
import AuthContext from '../../../auth';
import { UserListsStoreContext } from '../../../stores/UserListsStore';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

/**
 * Comment dropdown card/container for a post associated with a top5list
 * 
 * @author PeteyLumpkins
 * 
 * @param {String} props.postId - the id of the post associated with this comment dropdown
 * @param {[Object]} props.comments - the array of comments associated with the post. Each comment
 * contains the name of the author and text associated with the post
 * 

 */
export default function CommentDropdownCard(props) {

    const { userListsStore } = useContext(UserListsStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            userListsStore.postComment(props.postId, event.target.value);
            setText("");
        }
    }

    const handleChange = (event) => {
        setText(event.target.value);
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
                label={auth.user === null ? "Login to add comments!" : "Add Comment"}
                disabled={auth.user === null}
                value={text}
                variant="standard"
                onChange={(event) => { handleChange(event); }}
                onKeyPress={(event) => { handleKeyPress(event); }}
            ></TextField>
        </Box>
    </Box>
        
    );
}