import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { GlobalStoreContext } from '../../store'
import { useContext } from 'react'

export default function DeleteListModel(props) {

    const { store } = useContext(GlobalStoreContext);

    const handleClose = () => {
        store.unmarkListForDeletion();
    };

    const handleDelete = () => {
        store.deleteMarkedList();
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