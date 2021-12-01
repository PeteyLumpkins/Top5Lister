import { useContext } from 'react';
import {HomeStoreContext} from '../../../store/home'

import Button from '@mui/material/Button'

export default function EditButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.setCurrentList(props.top5list)
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