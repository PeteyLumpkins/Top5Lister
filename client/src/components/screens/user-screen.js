import UserListCard from '../cards/UserListCard';
import Statusbar from '../Statusbar';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

export default function UserScreen() {



    return (
        
        <Box b={10}>
            <List sx={{ 
                    background: "lightgray", 
                    overflow: 'scroll',
                    padding: '10px',
                }}
            >
                <UserListCard bottomGutter={true}></UserListCard>
                <br></br>
                <UserListCard></UserListCard>
                <UserListCard></UserListCard>
                <Statusbar></Statusbar>
            </List>
        </Box>
    );
}