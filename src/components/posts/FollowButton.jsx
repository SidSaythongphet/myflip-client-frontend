import React, { useState, useEffect } from 'react';
import { baseURL, headers } from '../../Globals';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FollowButton = ({ currentUser, post, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const followees = [...currentUser.followees]
    const follow = followees.find(follow => follow.id === post.user.id)
    if (follow) {
      setIsFollowing(true)
    }
  }, [isFollowing])

  const handleFollow = async () => {
    const strongParams = {
      followship: {
        follower_id: currentUser.id,
        followee_id: post.user.id
      }
    }
  
    const response = await fetch(baseURL + '/followships', {
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
      setIsFollowing(true)
      onFollow(data)
      toast.success(`You are now following ${ post.user.username }`)
    } else {
      toast.error(data.error)
      console.log(data.error)
    }   
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()
    const response = await fetch(baseURL + `/followships/${post.user.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${ localStorage.getItem('jwt') }`
      }
    })
    if (response.ok) {
      setIsFollowing(false)
      toast.success(`You unfollowed ${ post.user.username }`)
    }
  }

  return (
    <>
      {
        !isFollowing
        ?
        <Button onClick={ handleFollow }>Follow</Button>
        :
        <Button onClick={ handleUnfollow }>Unfollow</Button>
      }
    </>
  )
}

export default FollowButton