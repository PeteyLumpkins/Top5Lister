import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';

export default function CommuntiyButton(props) {
    return (
        <IconButton
            disabled={props.disabled}
            sx={{color: "white"}}
        >
            <FunctionsIcon
                sx={{color: "lightgreen"}}
                fontSize="large"
            >
            </FunctionsIcon>
        </IconButton>
    )
}