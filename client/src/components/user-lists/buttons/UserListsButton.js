import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

/**
 * IconButton for linking to the UserListsPage from the UserListsPage
 * 
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
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