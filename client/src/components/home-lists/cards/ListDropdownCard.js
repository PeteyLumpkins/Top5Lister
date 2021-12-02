import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function ListDropdownCard(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: '#01579b' }}>
            {
                props.items.map((item, index) => (
                    <Box sx={{color: 'gold', padding: '10px'}}>{(index + 1) + ". " + item}</Box>
                ))
            }
        </Card>
    );
}