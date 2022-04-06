import { Container, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../Globals';
import StyledBox from '../styles/StyledBox';
import FollowingDisplay from './FollowingDisplay';
import UserInfoContainer from './UserInfoContainer';
import UsersPosts from './UsersPosts';

const DashboardPage = ({ currentUser, onUpdateUser, followees, notifyErrors }) => {
  const [usersPosts, setUsersPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + `/users/${currentUser.id}/posts`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setUsersPosts(data)
      } else {
        console.log(data.error)
      }
    }
    if (currentUser.id) {
      fetchData()
    }
  }, [])

  const handleDeletePost = (deletedPost) => {
    const updatePosts = usersPosts.filter(post => post.id !== deletedPost.id)
    setUsersPosts(updatePosts)
  }
  
  const renderUsersPosts = usersPosts.map(post => {
    return (
      <Grid item key={ post.id }>
        <UsersPosts post={ post } currentUser={ currentUser } onDeletePost={ handleDeletePost }/>
      </Grid>  
    )
  })

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="center">
          <UserInfoContainer currentUser={ currentUser } onUpdateUser={ onUpdateUser } notifyErrors={ notifyErrors }/>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <FollowingDisplay currentUser={ currentUser } followees={ followees }/>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <StyledBox width="900px">
            { usersPosts > 0 ? renderUsersPosts : <Typography textAlign='center'>Create your first post</Typography> }
          </StyledBox>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage