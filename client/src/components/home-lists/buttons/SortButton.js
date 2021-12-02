import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useState, useContext } from 'react';
import { HomeStoreContext, HomeStoreSortType } from '../../../stores/HomeListsStore';

export default function SortButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { homeStore } = useContext(HomeStoreContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button
          sx={{color: "white"}}
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Sort By <SortIcon></SortIcon>
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
          Object.keys(HomeStoreSortType).map((key) => (
                <MenuItem onClick={() => {
                    homeStore.loadLists(key, null);
                    handleClose();
                }}
                >{HomeStoreSortType[key][0].toUpperCase() + HomeStoreSortType[key].toLowerCase().slice(1)}
                </MenuItem>
          ))}
        </Menu>
      </div>
    );
}