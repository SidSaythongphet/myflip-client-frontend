import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { baseURL, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import StyledBox from '../styles/StyledBox';


const Login = ({ loginUser, loggedIn, notifyErrors }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const strongParams = {
      user: {
        username,
        password
      }
    }

    const response = await fetch(baseURL + '/login', {
      method: "POST",
      headers,
      body: JSON.stringify(strongParams)
    })
    const data = await response.json()
    if (response.ok) {
      loginUser(data.user)
      localStorage.setItem('jwt', data.token)
      navigate(`/dashboard/${ username }`)
    } else {
      data.errors.map(err => notifyErrors(err))
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StyledBox width="600px">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Typography variant='h4'>Login</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                label="Username"
                name="username"
                fullWidth
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
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

export default Login
