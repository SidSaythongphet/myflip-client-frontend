import React, { useState } from 'react';
import { baseURL, headers } from '../../Globals';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const DeletePostButton = ({ post, onDeletePost }) => {
    const [anchorMenu, setAnchorMenu] = useState(null)

    const handleOpenMenu = (event) => {
        setAnchorMenu(event.currentTarget)
    }
  
    const handleCloseMenu = () => {
        setAnchorMenu(null)
    }

    const handleDelete = async () => {
        const response = await fetch(baseURL + `/posts/${post.id}`, {
            method: "DELETE",
        })
        // response.json() returns a Promise, we must await it
        const data = await response.json()
        if (response.ok) {
            onDeletePost(post)
        } else {
            //TODO add toast error
            console.log(data.error)
        }
    }

    return (
        <>
            <IconButton aria-label="deletes" onClick={handleOpenMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorMenu)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Typography textAlign="center" onClick={handleDelete}>Delete</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DeletePostButton