import UserListCard from '../cards/UserListCard';
import Statusbar from '../Statusbar';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

export default function UserScreen() {

    return (
        
        <Box sx={{ overflow: 'auto',
        padding: '10px', bgcolor: "lightgray", height: "100%"}}b={10}>
            <List 
            >
                <UserListCard></UserListCard>
                <br></br>
                <UserListCard></UserListCard>
                <br></br>
                <UserListCard></UserListCard>
                <br></br>
                <UserListCard></UserListCard>
                <br></br>
                <UserListCard></UserListCard>
                <br></br>
            </List>
        </Box>
    );
}