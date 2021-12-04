import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";

import AuthContext from '../../../auth';
import { HomeStoreContext } from '../../../stores/HomeListsStore';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

export default function CommentDropdownCard(props) {

    const [text, setText] = useState("");

    const { homeStore } = useContext(HomeStoreContext);
    const { auth } = useContext(AuthContext);

    const handleChange = (event) => { 
        setText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            homeStore.postComment(props.postId, event.target.value)
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
                sx={{ width: "98%" }} 
                label={auth.user === null ? "Login to add comments!" : "Add Comment"}
                variant="standard"
                disabled={auth.user === null}
                value={text}
                onKeyPress={(event) => { handleKeyPress(event); }}
                onChange={(event) => { handleChange(event); }}
            ></TextField>
        </Box>
    </Box>
        
    );
}