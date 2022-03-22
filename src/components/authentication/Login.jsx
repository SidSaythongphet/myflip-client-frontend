import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { baseURL, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';


const Login = ({ loginUser, loggedIn }) => {
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
      navigate('/')
    } else {
      //TODO add toast error
      console.log(data.errors)
    }
  }

  return (
    <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        noValidate
        autoComplete="off"
    >
      <TextField
        required
        label="Username"
        name="username"
        value={ username }
        onChange={ (e) => setUsername(e.target.value) }
      />
      <TextField
        required
        label="Password"
        type="password"
        name="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <Button onClick={ handleSubmit }>Submit</Button>
    </Box>
  )
}

export default Login