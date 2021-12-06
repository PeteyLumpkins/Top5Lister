import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';

/**
 * Button for linking to the AllListsScreen from the CommunityListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
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