import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

/**
 * Dropdown card that displays the items associated with a top5list on the all-lists screen
 * @author PeteyLumpkins
 * 
 * @param {[String]} props.items - an array the items associated with the top5list
 */
export default function ListDropdownCard(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: '#01579b' }}>
            {
                props.items.map((item, index) => (
                    <Box sx={{fontSize: '125%', color: '#ffc107', padding: '10px'}}>{(index + 1) + ". " + item}</Box>
                ))
            }
        </Card>
    );
}