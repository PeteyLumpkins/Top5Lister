import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'

export default function HomeButton(props) {
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