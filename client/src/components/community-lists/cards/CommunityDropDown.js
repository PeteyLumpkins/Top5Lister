import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

/**
 * The dropdown card to display the top5items in a community list
 * @author PeteyLumpkins
 * 
 * @param {[String]} props.items - array of the top5lists items
 */
export default function CommunityDropdownCard(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: '#0277bd'}}>
            {
                props.items.map((item, index) => (
                    <Box sx={{color: '#ffc107', paddingLeft : 2, paddingTop : 1}}>
                        <Box sx={{fontSize: '125%'}}>{(index + 1) + ". " + item.name}</Box>
                        <Box sx={{paddingLeft : 2, fontSize : '75%'}}>{"(" + item.count + " votes)"}</Box>
                    </Box>
                ))
            }
        </Card>
    );
}