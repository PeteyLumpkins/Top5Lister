import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";

import AuthContext from "../../../auth";
import { AllListsStoreContext } from '../../../stores/AllListsStore';
import { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

/**
 * The comment dropdown section that displays the comments for a top5list on the all-lists screen
 * @author PeteyLumpkins
 * 
 * @param {String} props.postId - the id of the post associated with this top5list 
 * @param {[Object]} props.comments - an array of comment objects to be displayed
 */
export default function CommentDropdownCard(props) {

    const { allListsStore } = useContext(AllListsStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

    const handleChange = (event) => { 
        setText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            allListsStore.postComment(props.postId, event.target.value);
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