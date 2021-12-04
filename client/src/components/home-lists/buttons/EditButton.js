import { useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore'
import EditIcon from '@mui/icons-material/Edit';

import { Button, Box } from '@mui/material/';

export default function EditButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.setCurrentList(props.top5list)
    }

    return (
        <Button 
            background='primary' 
            sx={{display: 'flex', justifyContent: 'space-between', color: 'red', textTransform: 'none', align: 'center'}}
            onClick={handleClick}
        >
            <Box>Edit</Box> <EditIcon fontSize='small' sx={{alignItems: 'top'}}></EditIcon>
        </Button>
    )
}