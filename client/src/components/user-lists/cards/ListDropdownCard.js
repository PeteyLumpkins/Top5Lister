import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

/**
 * ListDropDown that displays the items in a top5list displayed on the user lists screen
 * 
 * @author PeteyLumpkins
 * 
 * @param {[String]} props.items - the items associated with the top5list for the listcard
 */
export default function ListDropdownCard(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: '#0277bd' }}>
            {
                props.items.map((item, index) => (
                    <Box sx={{fontSize: '125%', color: '#ffc107', padding: '10px'}}>{(index + 1) + ". " + item}</Box>
                ))
            }
        </Card>
    );
}