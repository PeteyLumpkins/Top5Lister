import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import AuthContext from '../auth';
import {useContext} from 'react';

/**
 * Component for displaying error messages to the user, such as attempting a login
 * with an invalid password.
 * 
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.open - whether the modal should be displayed or shouldn't be displayed
 * @param {String} props.title - the title of the error message to be displayed
 * @param {String} props.message - the message description of the error to be displayed
 */
export default function ErrorModal(props) {

    const { auth } = useContext(AuthContext);

    const handleClose = () => {
        auth.clearErrorMessage();
    };

    return (
        <div>
        <Dialog
            open={props.open}
            onClose={handleClose}
        >
            <Alert severity="error">
                {props.title + " - " + props.message}
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </Alert>

        </Dialog>
        </div>
    );
}