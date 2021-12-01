import { Typography } from '@mui/material'


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    
    return (
        <div id="top5-statusbar">
            <Typography variant="h4">{props.text}</Typography>
        </div>
    );
}

export default Statusbar;