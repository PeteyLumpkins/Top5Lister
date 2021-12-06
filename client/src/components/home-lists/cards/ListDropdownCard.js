import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

/**
 * The HomeListScreens list dropdown for displaying the items associated with a top5list. 
 * @author PeteyLumpkins
 * 
 * @param {[String]} props.items - array of the listcards top5lists items
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