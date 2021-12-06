import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Button for linking to the HomeListsScreen from the CommunityListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
export default function HomeListsButton(props) {
    return (
        <IconButton
            disabled={props.disabled}
            sx={{
                color: "white",
            }}
         >
            <HomeIcon
                fontSize="large"
            >
            </HomeIcon>
        </IconButton>
    )
}