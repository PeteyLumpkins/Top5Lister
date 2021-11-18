import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Box from '@mui/material/Box';
import Comment from "./Comment";

import TextField from '@mui/material/TextField';

export default function CommentSection() {

    return(

    <Box sx={{ height: "100%", maxHeight: "100%"}}>
        <List sx={{height: "70%", maxHeight: "75%", overflow: 'scroll'}}>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <ListItem autoFocus={true}></ListItem>
        </List>
        <Box sx={{ marginTop: "5%", width: "100%", height: "20%"}}>
            <TextField sx={{ width: "100%"}} id="outlined-basic" label="Add Comment" variant="outlined">Add Comment</TextField>
        </Box>
    </Box>
        
    );
}