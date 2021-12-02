import Button from '@mui/material/Button';
import { useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore'

export default function PublishButton(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = () => {
        homeStore.publishCurrentList();
    }

    const isListNameUnique = () => {
        return homeStore.top5lists.filter((list) => {
            return list.published !== null &&
                list.name === homeStore.currentList.name &&
                list._id !== homeStore.currentList._id
        }).length === 0;
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