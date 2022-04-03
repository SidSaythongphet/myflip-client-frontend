import React, { useEffect, useState } from 'react';
import { baseURL, headers } from '../../Globals';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

const LikeButton = ({ currentUser, post, onLike, onUnlike }) => {
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const like = post.likes.find(like => like.user_id === currentUser.id)
    if (like) {
      setIsLiked(true)
    }
  }, [isLiked])

  const handleLike = async (e) => {
    e.preventDefault()
    const strongParams = {
      like: {
        user_id: currentUser.id,
        post_id: post.id
      }
    }

    const response = await fetch(baseURL + '/likes', {
      method: "POST",
      headers: {
        ...headers,
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      },
      body: JSON.stringify(strongParams)
    })

    const data = await response.json()
    if (response.ok) {
      setIsLiked(true)
      onLike(data)
    } else {
      console.log(data.error)
    }
  }

  const handleUnlike = async (e) => {
    e.preventDefault()
    const response = await fetch(baseURL + `/likes/${currentUser.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      }
    })
    if (response.ok) {
      setIsLiked(false)
      onUnlike()
    }
  }

  return (
    <>
      {
        !isLiked
        ?
        <IconButton aria-label="like" onClick={ handleLike }>
          <FavoriteIcon />
        </IconButton>
        :
        <IconButton aria-label="unlike" onClick={ handleUnlike }>
          <FavoriteIcon sx={{ color: red[500] }}/>
        </IconButton>
      }
    </>
  )
}

export default LikeButton