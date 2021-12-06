import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

import { useState, useContext } from 'react';
import { UserListsStoreContext, UserListsStoreSortType } from '../../../stores/UserListsStore';

export default function SortButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { userListsStore } = useContext(UserListsStoreContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Box sx={{display: 'flex', width: '50%', justifyContent: 'right'}}>
        <Button
          sx={{color: "white", width: '100%', display: 'flex', justifyContent: 'space-around'}}
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Box>Sort By</Box> <SortIcon fontSize='large'></SortIcon>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {
          Object.keys(UserListsStoreSortType).map((key) => (
                <MenuItem onClick={() => {
                    userListsStore.loadLists(key);
                    handleClose();
                }}
                key={key}
                >{UserListsStoreSortType[key][0].toUpperCase() + UserListsStoreSortType[key].toLowerCase().slice(1)}
                </MenuItem>
          ))}
        </Menu>
      </Box>
    );
}