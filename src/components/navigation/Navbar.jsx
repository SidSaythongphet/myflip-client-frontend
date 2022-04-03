import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Navbar = ({ logoutUser, loggedIn, currentUser }) => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { first_name, last_name, profile_picture_url, username } = currentUser
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    logoutUser()
    setAnchorElUser(null)
  }

  return (
    <Box 
      sx={{ flexGrow: 1 }}
      style={{
        margin: '0 0 100px'
      }}
    >
      <AppBar position="fixed" 
        style={{
          backgroundColor: '#800000'
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            fontFamily="Permanent Marker"
            sx={{ flexGrow: 1, display: { xs: 'flex' }, padding: '0 50px' }}
          >
            myFlip
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex' }, padding: '0 50px' }}>
            {   
              !loggedIn 
              ?
              <>
                <Link to='/signup' style={{ textDecoration: 'none' }}><Button sx={{ my: 2, color: 'white' }}>Sign Up</Button></Link>
                <Link to='/login' style={{ textDecoration: 'none' }}><Button sx={{ my: 2, color: 'white' }}>Login</Button></Link>
              </>
              :
              <>
                <Tooltip title="New Post">
                  <IconButton  sx={{ p: "0, 5" }}>
                    <Link to='/newpost' style={{ textDecoration: 'none', color: '#FFF' }}><AddIcon fontSize='large'/></Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title={ first_name + ' ' + last_name }>
                  <IconButton onClick={ handleOpenUserMenu } sx={{ p: "0, 5" }}>
                    <Avatar alt={ first_name + last_name } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={ anchorElUser }
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={ Boolean(anchorElUser) }
                  onClose={ handleCloseUserMenu }
                >
                  <MenuItem onClick={ handleCloseUserMenu }>
                    <Link to={`/dashboard/${ username }`} style={{ textDecoration: 'none', color: 'black' }}>
                      <Avatar alt={ first_name + last_name } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } />
                      <Stack>
                        <Typography textAlign="left">{ first_name + ' ' + last_name }</Typography>
                        <Typography textAlign="left">See your profile</Typography>
                      </Stack>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={ handleCloseUserMenu } >
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                      <Avatar sx={{ bgcolor: '#800000' }}><DashboardIcon/></Avatar>
                      <Typography textAlign="center">Posts</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={ handleLogout } >
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                      <Avatar sx={{ bgcolor: '#800000' }}><LogoutIcon/></Avatar>
                      <Typography textAlign="center">Logout</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar