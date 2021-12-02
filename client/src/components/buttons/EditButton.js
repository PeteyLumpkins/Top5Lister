import { useContext } from 'react';
import {HomeStoreContext} from '../../stores/HomeListsStore'

import Button from '@mui/material/Button'

export default function EditButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.setCurrentList(props.top5list)
        console.log(homeStore.currentList);
    }

    return (
        <Button 
            background='primary' 
            sx={{color: 'red'}}
            onClick={handleClick}
        >
            Edit
        </Button>
    )
}