import { useState, useContext } from 'react';
import {HomeStoreContext} from '../../store/home';
import { ViewStoreContext } from '../../store/view';
import { ViewStorePageType } from '../../store/view'

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
import DeleteButton from '../buttons/DeleteButton'

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
 
  let published = "" 
  if (props.top5list.published === null) {
    published = <EditButton top5list={props.top5list}></EditButton>
  } else {
    published = "Published: " + props.top5list.published.toString();
  }

  let likes = ""
  let dislikes = ""
  let views = ""
  let comments = ""

  if (props.top5list.post !== null) {
    likes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <LikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null || props.top5list.post.likes.includes(auth.user.id)}
      /> {props.top5list.post.likes.length}
    </Box>
    dislikes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <DislikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null || props.top5list.post.dislikes.includes(auth.user.id)}
      /> {props.top5list.post.dislikes.length}
    </Box>
    views = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      {"Views: " + props.top5list.post.views}
    </Box>
    comments = 
      <CommentSection 
        postId={props.top5list.post._id} 
        comments={props.top5list.post.comments}
      ></CommentSection>
   
  }

  let deleteButton = ""
  console.log()
  if (viewStore.page === ViewStorePageType.HOME && auth.user && auth.user.id === props.top5list.userId) {
    deleteButton = <Box sx={{paddingLeft: 2}}>
      <DeleteButton top5list={props.top5list}></DeleteButton>
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
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '2%',
      maxHeight: '100%',
      background: 'white',
      marginBottom: '1%',
      border: 1,
      borderColor: 'gray'
      }}
    >
      <Box sx={{ height: '20%', width: '96%', display: 'flex'}}>
        <Box sx={{display: 'flex', width: '50%'}}>
          <Box sx={{fontSize: '150%'}}>{props.top5list.name}
            <Box sx={{fontSize: '50%'}}>{"By: " + props.top5list.author}</Box>
          </Box>
        </Box>
        <Box sx={{display: 'flex', width: '50%', justifyContent: 'right'}}>
          {likes} 
          {dislikes}
          {deleteButton}
        </Box>
      </Box>
        <Collapse sx={{height: '60%'}} in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{display: 'flex', width: '100%', height: '96%', maxHeight: '96%'}}>
              <Box sx={{paddingRight: 2, width: '50%', height: "90%"}}>
                <ListDropDown items={props.top5list.items}/>
              </Box>
              <Box sx={{paddingLeft: "2%", paddingRight: '2%', width: '50%'}}>
                {comments}
              </Box>
          </CardContent>
        </Collapse>
      <Box sx={{ display: 'flex', width: '100%', height: '20%'}}>
            <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                <Box sx={{color: 'green'}}>{published}</Box>
            </Box>
            <Box sx={{alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'right'}}>
                {views}
                <ExpandMore
                    size='small'
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

