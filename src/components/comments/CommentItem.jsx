import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';

const CommentItem = ({ comment }) => {
  return (
    <Grid item xs={12} container justifyContent='space-between'>
      <Grid item xs={1} alignSelf='center'>
        <Avatar src={ comment.user.profile_picture_url ? comment.user.profile_picture_url : null } sx={{ width: 27, height: 27 }}></Avatar>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='subtitle1'>{ comment.user.username }</Typography>
        <Typography variant='body1'>{ comment.body }</Typography>
      </Grid>
    </Grid>
  )
}

export default CommentItem