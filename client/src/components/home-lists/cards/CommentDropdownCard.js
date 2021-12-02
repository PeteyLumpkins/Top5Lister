import List from '@mui/material/List';
import Box from '@mui/material/Box';

import Comment from "./CommentCard";
import { HomeStoreContext } from '../../../stores/HomeListsStore'
import { useContext } from 'react';

import TextField from '@mui/material/TextField';

export default function CommentDropdownCard(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            homeStore.postComment(props.postId, event.target.value)
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
                label="Add Comment" 
                variant="standard"
                onKeyPress={(event) => { handleKeyPress(event); }}
            >Add Comment</TextField>
        </Box>
    </Box>
        
    );
}