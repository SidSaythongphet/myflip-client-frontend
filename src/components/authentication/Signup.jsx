import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { baseURL, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import { fileChecksum } from '../utils/checksum';

const Signup = ({ loginUser, loggedIn }) => {
  const [userData, setUserData] = useState({
    first_name: "", 
    last_name: "",
    username: "", 
    email: "", 
    password: "", 
    password_confirmation: ""
  })
  // const [file, setFile] = useState(null)
  // const [profilePicture, setProfilePicture] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
        navigate('/')
    }
  }, [loggedIn])

  const handleChange = (e) => {
    // if (e.target.type === 'file') {
    //   setFile(e.target.files[0])
    // }
    // if (e.target.name !== 'profile_picture') {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      })
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const strongParams = {
      user: {
        ...userData
      }
    }

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
      console.log(data.errors)
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="First Name"
            name="first_name"
            value={ userData.first_name }
            onChange={ handleChange }
          />
          <TextField
            required
            label="Last Name"
            name="last_name"
            value={ userData.last_name }
            onChange={ handleChange }
          />
          <TextField
            required
            label="Username"
            name="username"
            value={ userData.username }
            onChange={ handleChange }
          />
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            value={ userData.email }
            onChange={ handleChange }
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={ userData.password }
            onChange={ handleChange }
          />
          <TextField
            required
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={ userData.password_confirmation }
            onChange={ handleChange }
          />
          <Button onClick={ handleSubmit }>Submit</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Signup