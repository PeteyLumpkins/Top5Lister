import { Card, Box } from '@mui/material/';

export default function Comment(props) {

    return (

        <Card sx={{p : 1, marginBottom: "2%", bgcolor: "gold", height: "20%", width: "96%"}}>
            <Box sx={{color: 'blue', fontSize: '75%' }}>{props.author}</Box>
            <Box sx={{paddingTop: 1}}>{props.text}</Box>
        </Card>
    )
}