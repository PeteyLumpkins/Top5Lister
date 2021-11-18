import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ListDropDown() {

    return (
        <List sx={{ margin: 'none', width: '100%', bgcolor: 'darkblue' }}>
            <Box sx={{color: 'gold', padding: '10px'}}>1.) Item Number 1</Box>
            <Box sx={{color: 'gold', padding: '10px'}}>1.) Item Number 1</Box>
            <Box sx={{color: 'gold', padding: '10px'}}>1.) Item Number 1</Box>
            <Box sx={{color: 'gold', padding: '10px'}}>1.) Item Number 1</Box>
            <Box sx={{color: 'gold', padding: '10px'}}>1.) Item Number 1</Box>
        </List>
    );
}