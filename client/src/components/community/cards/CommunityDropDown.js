import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function CommunityDropdownCard(props) {

    return (
        <Card sx={{width: '100%', height: '100%', bgcolor: '#01579b'}}>
            {
                props.items.map((item, index) => (
                    <Box sx={{color: 'gold', paddingLeft : 2, paddingTop : 1}}>
                        <Box>{(index + 1) + ". " + item.name}</Box>
                        <Box sx={{paddingLeft : 2, fontSize : '75%'}}>{"(" + item.count + " votes)"}</Box>
                    </Box>
                ))
            }
        </Card>
    );
}