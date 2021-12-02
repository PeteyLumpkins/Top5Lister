import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

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