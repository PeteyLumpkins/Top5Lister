import { useState, useContext } from 'react';
import {HomeStoreContext} from '../../../stores/HomeListsStore';

import AuthContext from '../../../auth';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ListDropDown from './ListDropdownCard'
import CommentSection from './CommentDropdownCard';

import EditButton from '../buttons/EditButton'
import LikeButton from '../buttons/LikeButton'
import DislikeButton from '../buttons/DislikeButton'
import DeleteButton from '../buttons/DeleteButton'

import Box from '@mui/material/Box';

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

/**
 * Listcard for a top5list to be displayed on the current users HomeListsScreen
 * @author PeteyLumpkins
 * 
 * @param {Object} props.top5list - the top5list associated with this list card
 */
export default function ListCard(props) {
  const [expanded, setExpanded] = useState(false);

  const { homeStore } = useContext(HomeStoreContext);
  const { auth } = useContext(AuthContext);
 
  let published = "" 
  if (props.top5list.published === null) {
    published = <EditButton top5list={props.top5list}></EditButton>
  } else {
    published = "Published: " + new Date(props.top5list.published).toLocaleString('en-US', {month: 'short', year: 'numeric', day: 'numeric'});
  }

  let likes = ""
  let dislikes = ""
  let views = ""
  let comments = ""

  if (props.top5list.post !== null) {
    likes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <LikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null}
        liked={auth.user !== null && props.top5list.post.likes.includes(auth.user.id)}
      /> {props.top5list.post.likes.length}
    </Box>
    dislikes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <DislikeButton 
        postId={props.top5list.post._id}
        disabled={auth.user === null}
        disliked={auth.user !== null && props.top5list.post.dislikes.includes(auth.user.id)}
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
  if (auth.user && auth.user.id === props.top5list.userId) {
    deleteButton = <Box sx={{paddingLeft: 2}}>
      <DeleteButton top5list={props.top5list}></DeleteButton>
    </Box>
  }

  const handleExpandClick = () => {
    // Adds a view if we open up the dropdown and the list has been published.
    if (!expanded && props.top5list.post !== null) {
      homeStore.viewPost(props.top5list.post._id);
    }
    setExpanded(!expanded);
  };

  return (
    <Card sx={{  
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '2%',
      maxHeight: '100%',
      background: props.top5list.published !== null ? '#e0e0e0' : 'white',
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