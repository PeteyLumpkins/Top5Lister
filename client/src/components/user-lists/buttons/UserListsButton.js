import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

export default function UserListsButton(props) {
    return (
        <IconButton
            sx={{color: "white"}}
            disabled={props.disabled}
        >
            <PersonIcon
                sx={{color: 'lightgreen'}}
                fontSize="large"
            >
            </PersonIcon>
        </IconButton>
    )
}