import * as React from 'react';
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

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ paddingTop: 'none', paddingLeft: '2%', background: 'lightblue'}}>
        <h3>{props.name}</h3>
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
                <h3>Published: Date?</h3>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: .1, justifyContent: 'space-between'}}>
                <h3>Views: 1455</h3>
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

