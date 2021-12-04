import { useState, useContext } from 'react';
import { CommunityStoreContext } from '../../../stores/CommunityListsStore';

import AuthContext from '../../../auth';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CommentDropdownCard from './CommentDropdownCard';
import CommunityDropdownCard from './CommunityDropDown';

import LikeButton from '../buttons/LikeButton'
import DislikeButton from '../buttons/DislikeButton'

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

export default function CommunityCard(props) {
  const [expanded, setExpanded] = useState(false);

  const { communityStore } = useContext(CommunityStoreContext);
  const { auth } = useContext(AuthContext);
 
  let date = "Last updated: " + new Date(props.communitylist.lastUpdated).toLocaleString('en-US', {month: 'short', year: 'numeric', day: 'numeric'})

  let likes = ""
  let dislikes = ""
  let views = ""
  let comments = ""

  if (props.communitylist.post !== null) {
    likes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <LikeButton 
        postId={props.communitylist.post._id}
        disabled={auth.user === null}
        liked={auth.user !== null && props.communitylist.post.likes.includes(auth.user.id)}
      /> {props.communitylist.post.likes.length}
    </Box>
    dislikes = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      <DislikeButton 
        postId={props.communitylist.post._id}
        disabled={auth.user === null}
        disliked={auth.user !== null && props.communitylist.post.dislikes.includes(auth.user.id)}
      /> {props.communitylist.post.dislikes.length}
    </Box>
    views = <Box sx={{paddingLeft: 2, paddingRight: 2}}>
      {"Views: " + props.communitylist.post.views}
    </Box>
    comments = 
      <CommentDropdownCard
        postId={props.communitylist.post._id} 
        comments={props.communitylist.post.comments}
      ></CommentDropdownCard>
   
  }

  const handleExpandClick = () => {
    // Adds a view if we open up the dropdown and the list has been published.
    if (!expanded && props.communitylist.post !== null) {
      communityStore.viewPost(props.communitylist.post._id);
    }
    setExpanded(!expanded);
  };

  return (
    <Card sx={{  
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '2%',

      maxHeight: '100%',
      background: '#e0e0e0',
      marginBottom: '1%',
      border: 1,
      borderColor: '#e6e6e6'
      }}
    >
      <Box sx={{ height: '20%', width: '96%', display: 'flex'}}>
        <Box sx={{display: 'flex', width: '50%'}}>
          <Box sx={{fontSize: '150%'}}>{props.communitylist.community[0].toUpperCase() + props.communitylist.community.slice(1).toLowerCase()}
          </Box>
        </Box>
        <Box sx={{display: 'flex', width: '50%', justifyContent: 'right'}}>
          {likes} 
          {dislikes}
        </Box>
      </Box>
        <Collapse sx={{height: '60%'}} in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{display: 'flex', width: '100%', height: '96%', maxHeight: '96%'}}>
              <Box sx={{paddingRight: 2, width: '50%', height: "90%"}}>
                <CommunityDropdownCard items={props.communitylist.items}/>
              </Box>
              <Box sx={{paddingLeft: "2%", paddingRight: '2%', width: '50%'}}>
                {comments}
              </Box>
          </CardContent>
        </Collapse>
      <Box sx={{ display: 'flex', width: '100%', height: '20%'}}>
            <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                <Box sx={{color: 'green'}}>{date}</Box>
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