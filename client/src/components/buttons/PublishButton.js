import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../store/home'

export default function PublishButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.publishCurrentList();
    }

    return (
        <Button
            color="primary"
            onClick={handleClick}
        >
            Publish
        </Button>
    );
}