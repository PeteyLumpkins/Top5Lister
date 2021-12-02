import { Card, Box } from '@mui/material/';

export default function CommentCard(props) {
    return (
        <Card sx={{
            border: 1, 
            borderColor: 'black',
            p : 1, 
            marginBottom: "2%", 
            bgcolor: "#90caf9", 
            height: "20%", 
            width: "95%"
        }}>
            <Box sx={{color: 'blue', fontSize: '75%' }}>{props.author}</Box>
            <Box sx={{color: 'black'}}>{props.text}</Box>
        </Card>
    );
}