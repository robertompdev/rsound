import React, { Component } from 'react'

/* --- styling import --- */
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

/* --- services import --- */
import AuthServices from '../../../../services/auth.services'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.services = new AuthServices()
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    postUser = () => {
        this.services.login(this.state)
            .then(theLoggedUser => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(theLoggedUser)
                this.props.history.push('/')
            })
            .catch(err => console.log({ err }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }

    render() {

        return (

            <Container className="auth-div">

                <h1>Log In</h1>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="light" type="submit">Log In</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Login