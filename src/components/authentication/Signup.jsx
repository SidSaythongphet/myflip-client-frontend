import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { baseURL, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import StyledBox from '../styles/StyledBox';

const Signup = ({ loginUser, loggedIn, notifyErrors }) => {
  const [userData, setUserData] = useState({
    first_name: "", 
    last_name: "",
    username: "", 
    email: "", 
    password: "", 
    password_confirmation: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(baseURL + '/signup', {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    if (response.ok) {
      loginUser(data.user)
      localStorage.setItem('jwt', data.token)
      navigate(`/dashboard/${ data.user.username }`)
    } else {
      data.errors.map(err => notifyErrors(err))
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StyledBox width="800px">
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography variant='h4'>Create an Account</Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label="First Name"
                  name="first_name"
                  fullWidth
                  value={ userData.first_name }
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  value={ userData.last_name }
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Username"
                name="username"
                fullWidth
                value={ userData.username }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={ userData.email }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  value={ userData.password }
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  name="password_confirmation"
                  fullWidth
                  value={ userData.password_confirmation }
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button onClick={ handleSubmit } variant='contained'>Submit</Button>
            </Grid>
          </Grid>
        </StyledBox>
      </Grid>
    </Grid>
  )
}

export default Signup