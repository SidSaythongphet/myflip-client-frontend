import React, { useState } from 'react';
import { baseURL, headers } from '../../Globals';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Switch from '@mui/material/Switch';
// import AddComment from '../comments/AddComment';
// import CommentContainer from '../comments/CommentContainer';

import DeletePostButton from './DeletePostButton';
import { Button } from '@mui/material';

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

const PostCard = ({ post, currentUser, onDeletePost }) => {
    const { id, body, image_url, user } = post
    const [expand, setExpand] = useState(false)
    const [expandComment, setExpandComment] = useState(false)
    const [checked, setChecked] = useState(false)
    const [comments, setComments] = useState(post.comments)

    const handleAddComment = comment => {
      setComments([...comments, comment])
      setExpandComment(!expandComment)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleExpandCommentContainer = async () => {
        setExpand(!expand)
    }
    const handleExpandComment = () => {
        setExpandComment(!expandComment);
    }

    const handleFollow = async () => {

      const strongParams = {
        follow: {
          follower_id: currentUser.id,
          following_id: user.id
        }
      }

      const response = await fetch(baseURL + '/follows', {
        method: "POST",
        headers: {
          ...headers,
          "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
        },
        body: JSON.stringify(strongParams)
      })
      // response.json() returns a Promise, we must await it
      const data = await response.json()
      if (response.ok) {
        console.log(data)
      } else {
          //TODO add toast error
          console.log(data.error)
      }   
    }

    return (
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar
                src={ user.profile_picture_url ? user.profile_picture_url  : null }
            />
          }
          action={
            currentUser.id === user.id ? <DeletePostButton post={ post } onDeletePost={ onDeletePost }/> : null
          }
          title={ user.username }
        />
        <CardMedia
          component="img"
          height="400"
          image={ image_url[!checked ? 0 : 1] }
          alt={ user.first_name + "'s image" }
          />
          <Button onClick={ handleFollow }>Follow</Button>
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />  
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                { body }
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
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
        <Collapse in={expandComment} timeout="auto" unmountOnExit>
            {/* <AddComment post_id={ id } currentUser={ currentUser } onHandleComment={ handleAddComment }/> */}
        </Collapse>
        <Collapse in={expand} timeout="auto" >
            {/* {comments.length === 0 ? <Typography>No Comments</Typography> : <CommentContainer  comments={ comments }/>} */}
        </Collapse>
      </Card>
    )
}

export default PostCard