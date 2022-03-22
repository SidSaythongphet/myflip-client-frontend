import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { baseURL, headers } from '../../Globals';
import { Navigate, useNavigate } from 'react-router-dom';
import StyledBox from '../styles/StyledBox';
import { fileChecksum } from '../utils/checksum';


const CreatePostForm = ({ currentUser, onNewPost }) => {
  const [body, setBody] = useState('')
  const [before, setBefore] = useState(null)
  const [beforePreview, setBeforePreview] = useState(null)
  const [after, setAfter] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (before) {
      const fileURL = URL.createObjectURL(before)
      setBeforePreview(fileURL)
    }
    if (after) {
      const fileURL = URL.createObjectURL(after)
      setAfterPreview(fileURL)
    }
  }, [before, after])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // POST request to API for authorized URL
    const createPresignedUrl = async(file, byte_size, checksum) => {
      let options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: {
            filename: file.name,
            byte_size: byte_size,
            checksum: checksum,
            content_type: 'image/png',
            metadata: {
              'message': 'image for parsing'
            }
          }
        })
      }
      let res = await fetch(baseURL + '/presigned_url', options)
      if (res.status !== 200) return res
      return await res.json()
    }

    const beforeChecksum = await fileChecksum(before)
    const presignedBeforeParams = await createPresignedUrl(before, before.size, beforeChecksum)
    const afterChecksum = await fileChecksum(after)
    const presignedAfterParams = await createPresignedUrl(after, after.size, afterChecksum)

    // 2) send file to said PUT request (to S3)
    const awsResponseBefore = await fetch(presignedBeforeParams.direct_upload.url, {
      method: 'PUT',
      headers: presignedBeforeParams.direct_upload.headers,
      body: before
    })
    if (!awsResponseBefore.ok) {
      console.log(awsResponseBefore)
    }
    const awsResponseAfter = await fetch(presignedAfterParams.direct_upload.url, {
      method: 'PUT',
      headers: presignedAfterParams.direct_upload.headers,
      body: after
    })
    if (!awsResponseAfter.ok) {
      console.log(awsResponseAfter)
    }

    const strongParams = {
      post: {
        user_id: currentUser.id,
        body,
        images: [
          presignedBeforeParams.blob_signed_id,
          presignedAfterParams.blob_signed_id
        ]
      }
    }
    // POST presignedFileParams.blob_signed_id as profile_picture value
        
    const response = await fetch(baseURL + `/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify(strongParams)
      })

      const data = await response.json()
      if (response.ok) {
        onNewPost(data)
        navigate('/')
      } else {
        console.log(data.errors)
      }
  }

  return (
    <StyledBox>
      <Grid container>
        <Grid item xs={6}>
          <Stack alignItems="center">
            <input type="file" accept="image/*" onChange={ (e) => setBefore(e.target.files[0])} />
            <Box sx={{ border: 1, height: '300px', width: '250px' }}>
              { beforePreview ? <img src={beforePreview} style={{ height: '300px'}} alt="preview before"/> : null }
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack alignItems="center">
            <input type="file" accept="image/*" onChange={ (e) => setAfter(e.target.files[0])} />
            <Box sx={{ border: 1, height: '300px', width: '250px' }}>
              { afterPreview ? <img src={afterPreview} style={{ height: '300px'}} alt="preview after"/> : null }
            </Box>
          </Stack>    
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Write something"
            name="body"
            value={ body }
            onChange={ (e) => setBody(e.target.value) }
          />  
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default CreatePostForm