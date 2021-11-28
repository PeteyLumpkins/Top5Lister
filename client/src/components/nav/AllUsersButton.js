import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

export default function AllUsersButton(props) {
    return (
        <IconButton
            sx={{color: "white"}}
            disabled={props.disabled}
        >
            <PersonIcon
                fontSize="large"
            >
            </PersonIcon>
        </IconButton>
    )
}