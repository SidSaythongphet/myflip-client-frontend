import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Switch from '@mui/material/Switch';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const UsersPosts = ({ post, currentUser }) => {
  const { body, image_url } = post
  const [checked, setChecked] = useState(false)

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="400"
        image={ image_url[!checked ? 0 : 1] }
        alt={ currentUser.first_name + "'s image" }
      />
      <Switch
        checked={checked}
        onChange={ (e) => setChecked(e.target.checked) }
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { body }
        </Typography>
      </CardContent>  
    </Card>
  )
}

export default UsersPosts