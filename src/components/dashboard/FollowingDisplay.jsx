import { Grid, Typography } from '@mui/material'
import React from 'react'
import StyledBox from '../styles/StyledBox'

const FollowingDisplay = ({ currentUser, followees }) => {
  return (
    <StyledBox width="900px">
        <Grid container textAlign="center">
          <Grid item xs={6}>
            <Typography variant="h5">Followers</Typography>
            <Typography variant="h6">{ currentUser.followers.length }</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Following</Typography>
            <Typography variant="h6">{ followees.length }</Typography>
          </Grid>
        </Grid>
    </StyledBox>
  )
}

export default FollowingDisplay