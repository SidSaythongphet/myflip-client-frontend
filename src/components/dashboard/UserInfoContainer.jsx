import React, { useState } from 'react';
import { baseURL, headers } from '../../Globals';
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import StyledBox from '../styles/StyledBox';
import UpdateProfilePicture from './UpdateProfilePicture';


const UserInfoContainer = ({ currentUser, onUpdateUser, notifyErrors }) => {
  const { id, first_name, last_name, username, email, profile_picture_url} = currentUser
  const [editable, setEditable] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email
  })

  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(baseURL + `/users/${id}`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify(updateForm)
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      data.errors.map(err => notifyErrors(err))
    }
  }

  return (
    <StyledBox width="900px">
      <Grid container sx={{ height: "100%" }} justifyContent="space-evenly">
        <Grid item xs={5} container justifyContent="center">
          <Stack alignItems="center" spacing={2}>
            <Avatar alt={ `${first_name} ${last_name}` } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } sx={{ width: 200, height: 200 }}/>
            <UpdateProfilePicture id={ id } onUpdateUser={ onUpdateUser } notifyErrors={ notifyErrors }/>
          </Stack>
        </Grid>
        <Grid item xs={7} container>
          <Grid item xs={12}>
            <Typography variant="h5">General Account Settings</Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={3}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={9} container spacing={1}>
              <Grid item xs={6}>
                <TextField 
                  id="outlined-basic" 
                  disabled={ !editable ? true : null }
                  fullWidth 
                  label="First Name"
                  variant="outlined" 
                  size="small" 
                  name="first_name" 
                  value={ updateForm.first_name } 
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  id="outlined-basic" 
                  disabled={ !editable ? true : null }
                  fullWidth 
                  label="Last Name" 
                  variant="outlined" 
                  size="small" 
                  name="last_name" 
                  value={ updateForm.last_name } 
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={3}>
              <Typography>Username</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField 
                id="outlined-basic"
                disabled={ !editable ? true : null }
                fullWidth 
                variant="outlined"
                size="small" 
                name="username" 
                value={ updateForm.username } 
                onChange={ handleChange }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={3}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField 
                id="outlined-basic"
                disabled={ !editable ? true : null }
                fullWidth 
                variant="outlined"
                size="small" 
                name="email" 
                value={ updateForm.email } 
                onChange={ handleChange }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item justifySelf="end">
          <Button onClick={ (e) => setEditable(!editable) }>{ !editable ? "Edit" : "Cancel" }</Button>
          {editable ? <Button onClick={ handleSubmit }>Submit</Button> : null }
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default UserInfoContainer