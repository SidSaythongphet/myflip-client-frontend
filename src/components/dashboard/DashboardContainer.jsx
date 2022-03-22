import { Grid } from '@mui/material'
import React from 'react'
import UserInfoContainer from './UserInfoContainer'

const DashboardContainer = ({ currentUser, onUpdateUser }) => {
  return (
    <Grid container>
      <UserInfoContainer currentUser={ currentUser } onUpdateUser={ onUpdateUser }/>
    </Grid>
  )
}

export default DashboardContainer