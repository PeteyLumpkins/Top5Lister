import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

/**
 * Button for linking to the UserListsScreen to the AllListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disableed - whether the button should be disabled or not
 */
export default function UserListsButton(props) {
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