import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';

/**
 * IconButton that links to the AllListsPage from the UserListsPage
 * 
 * @author PeteyLumpkins
 * 
 * @param {boolean} props - whether the button should be disabled or not
 */
export default function AllListsButton(props) {
    return (
        <IconButton
            sx={{color: "white"}}
            disabled={props.disabled}
        >
            <GroupsIcon
                fontSize="large"
            >
            </GroupsIcon>
        </IconButton>
    )
}