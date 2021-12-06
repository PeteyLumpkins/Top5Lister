import { Card, Box } from '@mui/material/';

/**
 * A card representing a comment associated with a community list
 * @author PeteyLumpkins
 * 
 * @param {String} props.author - the username of the author of the comment
 * @param {String} props.text - the text associated with the comment
 */
export default function Comment(props) {

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
    )
}