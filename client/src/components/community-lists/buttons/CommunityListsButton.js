import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';

/**
 * Button for linking to the CommunityListsScreen from the CommunityListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
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