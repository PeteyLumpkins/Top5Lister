import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { ViewStoreContext } from '../../store/view'
import { ViewStoreSortType } from '../../store/view'

import { useState, useContext } from 'react';

export default function SortButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { viewStore } = useContext(ViewStoreContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleLikes = () => {
        viewStore.sortLists(ViewStoreSortType.LIKES);
    }

    const handleDislikes = () => {
        viewStore.sortLists(ViewStoreSortType.DISLIKES);
    }

    const handleViews = () => {
        viewStore.sortLists(ViewStoreSortType.VIEWS);
    }

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
          <MenuItem onClick={handleLikes}>Likes</MenuItem>
          <MenuItem onClick={handleDislikes}>Dislikes</MenuItem>
          <MenuItem onClick={handleViews}>Views</MenuItem>
        </Menu>
      </div>
    );
}