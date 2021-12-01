import Button from '@mui/material/Button';

import { useContext } from 'react';

import {ViewStoreContext} from '../../store/view'
import {HomeStoreContext} from '../../store/home'

export default function PublishButton(props) {

    const { homeStore } = useContext(HomeStoreContext);
    const { viewStore } = useContext(ViewStoreContext);

    const handleClick = () => {
        homeStore.publishCurrentList();
    }

    const isListNameUnique = () => {
        for (let i = 0; i < viewStore.top5lists.length; i++) {
            if (viewStore.top5lists[i].name === homeStore.currentList.name &&
                viewStore.top5lists[i]._id !== homeStore.currentList._id) {
                    return false;
            }
        }
        return true;
    }

    const allItemsUnique = () => {
        return homeStore.currentList.items.filter((e1) => {
            return homeStore.currentList.items.filter((e2) => { return e1 === e2} ).length > 1; 
        })
    }

    return (
        <Button
            color="primary"
            onClick={handleClick}
            disabled={homeStore.isItemEditActive || 
                homeStore.isListNameEditActive ||
                !isListNameUnique() ||
                allItemsUnique().length !== 0
            }
        >
            Publish
        </Button>
    );
}