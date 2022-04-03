import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import DashboardPage from "./components/dashboard/DashboardPage";
import Navbar from "./components/navigation/Navbar";
import CreatePostForm from "./components/posts/CreatePostForm";
import PostContainer from "./components/posts/PostContainer";
import Home from "./components/static/Home";
import { baseURL, headers } from "./Globals";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#00d4ff',
      main: '#094f79',
      dark: '#020024',
    },
    secondary: {
      light: '#ffdd72',
      main: '#ffd54f',
      dark: '#b29537',
    }
  },
  typography: {
    fontFamily: 'Mada',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])
  const [followees, setFollowees] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const notifyErrors = message => toast.error(message);

  const loginUser = user => {
    setCurrentUser(user)
    setFollowees(user.followees)
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    setPosts([])
    setFollowees([])
    localStorage.removeItem('jwt')
  }
  console.log("Posts:", posts)
  console.log("CurrentUser:", currentUser)
  console.log("Followees:", followees)
  // check if local storage has token and if so, set current user 
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const fetchPosts = async () => {
      const response = await fetch(baseURL + '/posts')
      const data = await response.json()
      if (response.ok) {
        setPosts(data)
      } else {
        console.log(data.errors)
      }
    }
    
    if (token && !loggedIn) {
      
      fetch(baseURL + '/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ token }`
        }
      })
      .then(resp => resp.json())
      .then(user => {
        loginUser(user)
      })
    }
    
    if (loggedIn) {
      fetchPosts()
    }
  }, [loggedIn])

  const handleUpdateUser = (user) => {
    setCurrentUser(user)
  }

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const handleDeletePost = (deletedPost) => {
    const updatePosts = posts.filter(post => post.id !== deletedPost.id)
    setPosts(updatePosts)
  }

  const handleFollow = user => {
    setFollowees([...followees, user])
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar logoutUser={ logoutUser} loggedIn={ loggedIn } currentUser={ currentUser }/>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={ <PostContainer posts={ posts } currentUser={ currentUser } onDeletePost={ handleDeletePost } onFollow={ handleFollow } isLoaded={ isLoaded }/> } />
          <Route path='/dashboard/:username' element={ <DashboardPage currentUser={ currentUser } notifyErrors={ notifyErrors } onUpdateUser={ handleUpdateUser } followees={ followees }/> }/>
          <Route path='/signup' element={ <Signup loginUser={ loginUser } loggedIn={ loggedIn } notifyErrors={ notifyErrors }/> } />
          <Route path='/login' element={ <Login loginUser={ loginUser } loggedIn={ loggedIn } notifyErrors={ notifyErrors } /> } />
          <Route path='/newpost' element={ <CreatePostForm currentUser={ currentUser } onNewPost={ handleNewPost }/> } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
