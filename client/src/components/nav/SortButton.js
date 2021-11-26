import SortIcon from '@mui/icons-material/Sort';

import Button from '@mui/material/Button';

export default function SortButton(props) {
    return (
        <Button
            disabled={props.disabled}
            sx={{
                display: "flex",
                color: "white",
            }}
        >
            Sort By
            <SortIcon
                fontSize="large"
            ></SortIcon>
        </Button>
        
    );
}