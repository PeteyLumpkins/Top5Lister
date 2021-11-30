import { Fab } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

import {ViewStoreContext} from '../../store/view'
import { useContext, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      light: "#f3e5f5",
      dark: "#ab47bc", 
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

// Needs likes
export default function LikeButton(props) {

    const { viewStore } = useContext(ViewStoreContext);

    const handleClick = () => {
        viewStore.likePost(props.postId);
    }

    return (
        <Fab
            onClick={handleClick}
            disabled={props.disabled}
            color="primary"
            size="small"
            disableFocusRipple={true}
            disableRipple={true}
            
        >
            <ThumbUpIcon></ThumbUpIcon>
        </Fab>
    )
}