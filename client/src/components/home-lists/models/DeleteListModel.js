import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { HomeStoreContext } from '../../../stores/HomeListsStore'
import { useContext } from 'react'

/**
 * Delete modal for deleting one of the current user's top5lists via the HomeListsScreen.
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.open - whether the modal should be displayed or not
 * @param {String} props.listName - the name of the list marked for deletion
 */
export default function DeleteListModel(props) {

    const { homeStore } = useContext(HomeStoreContext);

    const handleClose = () => {
        homeStore.unmarkListForDeletion();
    };

    const handleDelete = () => {
        homeStore.deleteMarkedList();
        handleClose();
    }

    return (
        <div>
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the Top 5 " + props.listName + " List?"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose} autoFocus>
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}