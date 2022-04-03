import React, { useState } from 'react'
import { baseURL, headers } from '../../Globals';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const AddComment = ({ post_id, currentUser, onHandleComment }) => {
  const [body, setBody] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const strongParams = {
      comment: {
        body,
        post_id,
        user_id: currentUser.id
      }
    }

    // fetch returns a Promise, we must await it
    const response = await fetch(baseURL + '/comments', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
        body: JSON.stringify(strongParams)
      })
    // response.json() returns a Promise, we must await it
    const data = await response.json()
    if (response.ok) {
      onHandleComment(data)
    } else {
      //TODO add toast error
      console.log(data.errors)
    }        
  }

  return (
    <CardContent component="form">
      <TextField placeholder='Add a comment' value={ body } onChange={ (e) => setBody(e.target.value) }/>
      <Button onClick={ handleSubmit }>
        <SendIcon/>
      </Button>
    </CardContent>
  )
}

export default AddComment