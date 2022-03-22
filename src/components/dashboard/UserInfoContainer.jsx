import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import StyledBox from '../styles/StyledBox';
import UpdateProfilePicture from './UpdateProfilePicture';


const UserInfoContainer = ({ currentUser, onUpdateUser }) => {
  const { id, first_name, last_name, username, email, profile_picture_url} = currentUser

  return (
    <Grid item>
      <StyledBox>
        <Grid container>
          <Grid item>
            <Avatar alt={ `${first_name} ${last_name}` } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } sx={{ width: 200, height: 200 }}/>
            <UpdateProfilePicture id={ id } onUpdateUser={ onUpdateUser } />
          </Grid>
          <Grid item xs={12}>
            <Typography>First Name</Typography>
            <Typography>{ first_name }</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Last Name</Typography>
            <Typography>{ last_name }</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Username</Typography>
            <Typography>{ username }</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Email</Typography>
            <Typography>{ email }</Typography>
          </Grid>
        </Grid>
      </StyledBox>
    </Grid>
  )
}

export default UserInfoContainer