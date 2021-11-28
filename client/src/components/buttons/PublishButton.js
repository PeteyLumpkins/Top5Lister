import Button from '@mui/material/Button';

import { useContext } from 'react';
import {HomeStoreContext} from '../../store/home'

export default function PublishButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handlePress = () => {
        // Published the current list to the database
    }

    return (
        <Button
            color="primary"
        >
            Publish
        </Button>
    );
}