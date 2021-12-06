import { Card, Box } from '@mui/material/';

/**
 * Card representing a comment on the all-lists screen
 * @author PeteyLumpkins
 * 
 * @param {String} props.author - the username of the author of the given comment
 * @param {String} props.text - the text of the comment
 */
export default function CommentCard(props) {
    return (

        <Card sx={{
            border: 1, 
            borderColor: 'black',
            p : 1, 
            marginBottom: "2%", 
            bgcolor: "#ffc107", 
            height: "20%", 
            width: "95%"
        }}>
            <Box sx={{color: 'blue', fontSize: '75%' }}>{props.author}</Box>
            <Box sx={{color: 'black'}}>{props.text}</Box>
        </Card>
    );
}