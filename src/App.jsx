import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import Navbar from "./components/navigation/Navbar";
import CreatePostForm from "./components/posts/CreatePostForm";
import PostContainer from "./components/posts/PostContainer";
import Home from "./components/static/Home";
import { baseURL, headers } from "./Globals";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])

  const loginUser = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  // check if local storage has token and if so, set current user 
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token && !loggedIn) {

      fetch(baseURL + '/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ token }`
        }
      })
        .then(resp => resp.json())
        .then(user => loginUser(user))
    }

    if (loggedIn) {
      fetch(baseURL + '/posts', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ token }`
        }
      })
        .then(resp => resp.json())
        .then(data => setPosts(data))
    }
  }, [loggedIn])

  const handleUpdateUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <Router>
      <Navbar logoutUser={ logoutUser} loggedIn={ loggedIn } currentUser={ currentUser }/>
       {loggedIn ? <h1>Welcome, { currentUser.first_name }</h1> : null}
      <Routes>
        <Route path='/' element={ <PostContainer posts={ posts } currentUser={ currentUser }/> } />
        <Route path='/dashboard/:username' element={ <DashboardContainer currentUser={ currentUser } onUpdateUser={ handleUpdateUser } /> }/>
        <Route path='/signup' element={ <Signup loginUser={ loginUser } loggedIn={ loggedIn }/> } />
        <Route path='/login' element={ <Login loginUser={ loginUser } loggedIn={ loggedIn } /> } />
        <Route path='/newpost' element={ <CreatePostForm currentUser={ currentUser }/> } />
      </Routes>
    </Router>
  )
}

export default App;
