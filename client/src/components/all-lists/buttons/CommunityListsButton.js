import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';

/**
 * Button for linking to the CommunityListsScreen to the AllListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disableed - whether the button should be disabled or not
 */
export default function CommuntiyButton(props) {
    return (
        <IconButton
            disabled={props.disabled}
            sx={{color: "white"}}
        >
            <FunctionsIcon
                fontSize="large"
            >
            </FunctionsIcon>
        </IconButton>
    )
}