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

    let disabled = homeStore.isItemEditActive || 
                homeStore.isListNameEditActive ||
                !isListNameUnique() ||
                allItemsUnique().length !== 0

    return (
        <Button
            sx={{
                border: 1, borderColor: disabled ? 'lightgrey' : 'black',
                color: disabled ? 'lightgray' : 'black',
                background: disabled ? "" : "",
                textTransform: 'none', fontWeight: 'bold', 
                width: "40%"
            }}
            onClick={handleClick}
            disabled={disabled}
        >
            Publish
        </Button>
    );
}