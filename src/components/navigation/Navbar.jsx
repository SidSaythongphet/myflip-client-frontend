import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
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
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            myFlip
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            myFlip
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
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
                  <IconButton  sx={{ p: 0 }}>
                    <Link to='/newpost' style={{ textDecoration: 'none' }}><AddIcon fontSize='large'/></Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={ first_name + last_name } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                      <Avatar alt={ first_name + last_name } src={ profile_picture_url === "" ? "/static/images/avatar/2.jpg" : profile_picture_url } />
                      <Stack>
                        <Typography textAlign="left">{ first_name + ' ' + last_name }</Typography>
                        <Typography textAlign="left">See your profile</Typography>
                      </Stack>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={`/dashboard/${ username }`} style={{ textDecoration: 'none' }}>
                      <DashboardIcon/>
                      <Typography textAlign="center">Dashboard</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={ handleLogout }>
                    <LogoutIcon />
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar