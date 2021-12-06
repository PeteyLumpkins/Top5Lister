import { Typography } from '@mui/material'

/**
 * Status bar for displaying the current list or set of lists being viewed
 * 
 * @author PeteyLumpkins
 * 
 * @param {String} props.text - the message for the status bar to display
 */
function Statusbar(props) {
    
    return (
        <div id="top5-statusbar">
            <Typography variant="h4">{props.text}</Typography>
        </div>
    );
}

export default Statusbar;