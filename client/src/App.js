import React, { Component } from 'react'

/* --- styling import --- */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

/* --- react-router-dom import --- */
import { Switch, Route, Redirect } from 'react-router-dom'

/* --- components import --- */
import ProjectsList from './components/pages/project/projectsList/ProjectsList'
import ProjectDetails from './components/pages/project/projectDetails/ProjectDetails'

import NavBar from './components/ui/NavBar'

import Signup from './components/pages/auth/signup/Signup'
import Profile from './components/pages/profile/Profile'
import Login from './components/pages/auth/login/Login'

/* --- services import --- */
import AuthServices from './services/auth.services'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.authServices = new AuthServices()
  }

  componentDidMount = () => this.fetchUser()

  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.authServices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }

  render() {

    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/" render={() => <ProjectsList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/details/:id" render={props => <ProjectDetails {...props} />} />
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>
      </>
    )
  }
}

export default App
