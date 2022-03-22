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

    // if (file) {
    //   const checksum = await fileChecksum(file)
    //   // POST request to API for authorized URL
    //   const createFileParams = await fetch(baseURL + '/presigned_url', {
    //     method: 'POST',
    //     headers,
    //     body: JSON.stringify({
    //       file: {
    //         filename: file.name,
    //         byte_size: file.size,
    //         checksum: checksum,
    //         content_type: 'image/png',
    //         metadata: {
    //           'message': 'image for parsing'
    //         }
    //       }
    //     })
    //   })
    //   const presignedFileParams = await createFileParams.json()
    //   if (!createFileParams.ok) {
    //     console.log(presignedFileParams.errors)
    //   } else {
    //     console.log(presignedFileParams.blob_signed_id)
    //     setProfilePicture(presignedFileParams.blob_signed_id) 
    //   }
    //   // PUT request to S3 to directly upload file and recieve URL
    //   const awsResponse = await fetch(presignedFileParams.direct_upload.url, {
    //     method: 'PUT',
    //     headers: presignedFileParams.direct_upload.headers,
    //     body: file
    //   })
    //   if (!awsResponse.ok) {
    //     console.log(awsResponse)
    //   }
    //   // POST presignedFileParams.blob_signed_id as profile_picture value
    // }
    
    const strongParams = {
      user: {
        ...userData
      }
    }

    console.log(strongParams)
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
          {/* <Button onClick={ handleUpload }>Submit</Button> */}
          {/* <input
            type="file"
            name="profile_picture"
            onChange={ handleChange }
          /> */}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Signup