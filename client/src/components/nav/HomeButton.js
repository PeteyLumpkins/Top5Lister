import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function HomeButton(props) {
    return (
        <IconButton
            disabled={props.disabled}
            href="/"
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