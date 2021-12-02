import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';

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