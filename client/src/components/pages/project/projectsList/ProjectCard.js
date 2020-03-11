import React, { Component } from 'react'

/*--- components import ---*/
import ProjectDetails from '../projectDetails/ProjectDetails'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import './ProjectCard.css'

/* --- services import --- */
import AuthServices from '../../../../services/auth.services'

/* --- react-router-dom import --- */
import { Link, Route } from 'react-router-dom'

class ProjectCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showmodal: false,
            userId: this.props.loggedInUser._id,
            projectId: this.props._id
        }
        this.services = new AuthServices()
    }

    componentDidMount = () => { console.log(this.state.userId, this.state.projectId) }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })
    //queEsProps = () => console.log(this.props)

    render() {
        return (
            <><Col md={4}>
                <Card className="card-project">
                    <Card.Img variant="top" src={this.props.imageUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <hr></hr>
                        {this.props.loggedInUser ?
                            <>
                                <Button as="div" className="mb-20" variant="dark" size="sm">
                                    <Route path={`/details/:${this.state.projectId}/:${this.state.userId}`} component={ProjectDetails} >Route</Route>
                                    <Link to={`/details/${this.state.projectId}/${this.state.userId}`} render={props => { return <ProjectDetails {...props} /> }}>Details</Link>
                                </Button>
                            </>
                            :
                            <>
                                {!this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Details</Button>}
                            </>}
                    </Card.Body>
                </Card>
            </Col >
                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3 >You are required to be logged in to see project's details</h3>
                        <hr />
                        <Row>
                            <Col md={3}>
                                <Button as="div" className="mb-20" variant="dark" size="sm">
                                    <Link to="/signup">SignUp</Link>
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button as="div" className="mb-20" variant="dark" size="sm">
                                    <Link to="/login">LogIn</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal></>
        )
    }
}

export default ProjectCard