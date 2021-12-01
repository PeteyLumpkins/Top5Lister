import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export default function ListDropDown(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: 'darkblue' }}>
            {
                props.items.map((item, index) => (
                    <Box sx={{color: 'gold', padding: '10px'}}>{(index + 1) + ". " + item}</Box>
                ))
            }
        </Card>
    );
}