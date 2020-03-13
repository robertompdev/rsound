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
import { Link } from 'react-router-dom'

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
                        <p>{this.props.description}</p>
                        <hr></hr>
                        {this.props.loggedInUser ?
                            <>
                                <Button as="div" className="mb-20" variant="light" size="sm">
                                    <Link
                                        to={{ pathname: `/details/${this.state.projectId}/${this.state.userId}`, state: { projectId: this.state.projectId, userId: this.state.userId } }}
                                        render={props => {
                                            return <ProjectDetails {...props} />;
                                        }}
                                    >Open</Link>
                                </Button>
                            </>
                            :
                            <>
                                {!this.props.loggedInUser && <Button className="mb-20" variant="light" onClick={this.openModal}>Details</Button>}
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
                                <Button as="div" className="mb-20" variant="light" size="sm">
                                    <Link to="/signup">SignUp</Link>
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button as="div" className="mb-20" variant="light" size="sm">
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