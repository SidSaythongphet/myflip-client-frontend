import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import DeletePostButton from './DeletePostButton';
import { Grid } from '@mui/material';
import AddComment from '../comments/AddComment';
import CommentContainer from '../comments/CommentContainer';
import LikeButton from './LikeButton';
import FollowButton from './FollowButton';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, currentUser, onDeletePost, onFollow }) => {
  const { id, body, image_url, user } = post
  const [expand, setExpand] = useState(false)
  const [expandComment, setExpandComment] = useState(false)
  const [checked, setChecked] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [likes, setLikes] = useState(post.likes)

  const handleAddComment = comment => {
    setComments([...comments, comment])
    setExpandComment(!expandComment)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const handleExpandCommentContainer = async () => {
    setExpand(!expand)
  }

  const handleExpandComment = () => {
    setExpandComment(!expandComment);
  }

  const handleLike = (like) => {
    setLikes([...likes, like])
  }

  const handleUnlike = () => {
    const updateLikes = likes.filter(like => like.user_id !== currentUser.id)
    setLikes(updateLikes)
  }

  return (
    <Grid item>
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <Avatar
              src={ user.profile_picture_url ? user.profile_picture_url  : null }
            />
          }
          action={
            currentUser.id === user.id ? <DeletePostButton post={ post } onDeletePost={ onDeletePost }/> : <FollowButton currentUser={ currentUser } post={ post } onFollow={ onFollow } />
          }
          title={ <Typography>{ user.username }</Typography> }
        />
        <CardMedia
          component="img"
          height="400"
          image={ image_url[!checked ? 0 : 1] }
          alt={ user.first_name + "'s image" }
        />
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />  
        <CardActions disableSpacing>
          <LikeButton currentUser={ currentUser } post={ post } onLike={ handleLike } onUnlike={ handleUnlike }/>
          <IconButton aria-label="add comment" onClick={ handleExpandComment }>
            <AddCommentIcon />
          </IconButton>
          <ExpandMore
            expand={expand}
            onClick={handleExpandCommentContainer}
            aria-expanded={expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>        
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">{ likes.length + ' likes'}</Typography>
          <Typography variant="body1">
            { body }
          </Typography>
        </CardContent>
        <Collapse in={expandComment} timeout="auto" unmountOnExit>
          <AddComment post_id={ id } currentUser={ currentUser } onHandleComment={ handleAddComment }/>
        </Collapse>
        <Collapse in={expand} timeout="auto" >
          {comments.length === 0 ? <Typography>No Comments</Typography> : <CommentContainer  comments={ comments }/>}
        </Collapse>
      </Card>
    </Grid>
  )
}

export default PostCard