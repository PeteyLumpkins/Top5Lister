import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Button for linking to the HomeListsScreen from the HomeListsScreen
 * @author PeteyLumpkins
 * 
 * @param {boolean} props.disabled - whether the button should be disabled or not
 */
export default function HomeListsButton(props) {
    return (
        <IconButton
            disabled={props.disabled}
            sx={{color: 'white'}}
         >
            <HomeIcon
                sx={{color: !props.disabled ? 'lightgreen' : ""}}
                fontSize="large"
            >
            </HomeIcon>
        </IconButton>
    )
}