import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';

/**
 * Button for linking to the AllListsScreen to the AllListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disableed - whether the button should be disabled or not
 */
export default function AllListsButton(props) {
    return (
        <IconButton
            sx={{color: "white"}}
            disabled={props.disabled}
        >
            <GroupsIcon
                sx={{color: 'lightgreen'}}
                fontSize="large"
            >
            </GroupsIcon>
        </IconButton>
    )
}
