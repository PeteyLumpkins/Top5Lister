import { useState, useContext } from 'react';
import {HomeStoreContext} from '../../store/home';
import { ViewStoreContext } from '../../store/view';
import AuthContext from '../../auth';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ListDropDown from './ListDropDown'
import CommentSection from './CommentSection'
import EditButton from '../buttons/EditButton'
import LikeButton from '../buttons/LikeButton'
import DislikeButton from '../buttons/DislikeButton'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserListCard(props) {
  const [expanded, setExpanded] = useState(false);

  const { homeStore } = useContext(HomeStoreContext);
  const { viewStore } = useContext(ViewStoreContext);
  const { auth } = useContext(AuthContext);
 
  let published = "Published"
  if (props.top5list.published === null) {
    published = <EditButton top5list={props.top5list}></EditButton>
  } 

  let likes = ""
  let dislikes = ""
  let views = ""

  if (props.top5list.post !== null) {
    likes = <Box>
      <LikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null || props.top5list.post.likes.includes(auth.user.id)}
      /> {props.top5list.post.likes.length}
    </Box>
    dislikes = <Box>
      <DislikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null || props.top5list.post.dislikes.includes(auth.user.id)}
      /> {props.top5list.post.dislikes.length}
    </Box>
    views = <Box>
      {"Views: " + props.top5list.post.views}
    </Box>
  }

  const handleExpandClick = () => {
    // Adds a view if we open up the dropdown and the list has been published.
    if (!expanded && props.top5list.post !== null) {
      viewStore.viewPost(props.top5list.post._id);
    }

    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
      paddingTop: 'none', 
      padding: '2%', 
      background: 'lightblue',
      marginBottom: '2%'
      }}
    >
      <Box sx={{display: 'flex'}}>
        {props.top5list.name}
        <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'right'}}>
          {likes} {dislikes}
        </Box>
      </Box>
    <CardActions disableSpacing>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Box sx={{ display: 'grid', flexGrow: 1 }}>
                <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ListDropDown></ListDropDown>
                        </Grid>
                        <Grid item xs={6}>
                            <CommentSection></CommentSection>
                        </Grid>
                </Grid>
            </Box>
        </CardContent>
      </Collapse>
        <Box sx={{ display: 'flex'}}>
            <Box sx={{ paddingLeft: '', display: 'flex', flexGrow: 1, justifyContent: 'left'}}>
                <Box sx={{color: 'green'}}>{published}</Box>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: .1, justifyContent: 'space-between'}}>
                {views}
                <ExpandMore
                    size='large'
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
        </Box>
    </Card>
  );
}

