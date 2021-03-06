import React, { Component } from 'react'

/* --- services import --- */
import AuthServices from '../../services/auth.services'

/* --- react-router-dom import --- */
import { Link } from 'react-router-dom'

/* --- styling import --- */
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './NavBar.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.services = new AuthServices()
    }

    logout = () => {
        this.services.logout()
            .then(() => this.props.setTheUser(false))
            .catch(err => console.log(err))
    }

    render() {

        const greeting = this.props.loggedInUser ? <>Hi, {this.props.loggedInUser.username}!</> : <>Greetings visitor!</>

        return (

            <Navbar className="navbar" fixed="top" expand="lg" >
                <div className="logo-div"><Navbar.Brand href="/">rSound</Navbar.Brand></div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {this.props.loggedInUser ?
                            <>
                                <Nav.Link as="div"> <Link to="/">Home</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/profile">Profile</Link></Nav.Link>
                                <Nav.Link onClick={this.logout}>LogOut</Nav.Link>
                                <Nav.Link as="div"><Link to="/profile">{greeting}</Link></Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as="div"> <Link to="/">Home</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/signup">SignUp</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/login">LogIn</Link></Nav.Link>
                                <Nav.Link as="div">{greeting}</Nav.Link>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default Navigation