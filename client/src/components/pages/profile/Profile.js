import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import './Profile.css'

/*--- Services import ---*/
import ProjectsServices from '../../../services/project.services'

/*--- Component import ---*/
import ProjectDetails from '../project/projectDetails/ProjectDetails'

/* --- react-router-dom import --- */
import { Link } from 'react-router-dom'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: [],
        }
        this.ProjectServices = new ProjectsServices()
    }

    componentDidMount() {
        this.getAllProjects()
    }

    getAllProjects = () => {
        this.ProjectServices.getAllProjects()
            .then(allProjects => {
                this.setState({ projects: allProjects })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Container >
                    <Row className="justify-content-md-center">
                        <h2><span className='user-name'>{this.props.loggedInUser.username}</span> you're in your profile page. Have fun!</h2>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <Card className="profile">
                                <Card.Body >
                                    {/* <Card.Title><h4>{props.loggedInUser.username}</h4></Card.Title> */}
                                    <Row>
                                        <Col md={3}>
                                            {this.props.loggedInUser.imageUrl ? <Card.Img variant="top" src={this.props.loggedInUser.imageUrl} /> : <div className="initial-letter">{this.props.loggedInUser.username.charAt(0)}</div>}
                                        </Col>
                                        <Col md={8}>
                                            <ListGroup >
                                                {this.state.projects.map(elm => <ListGroup.Item className="list-of-projects">
                                                    <Link
                                                        to={{ pathname: `/details/${this.state.projectId}/${this.props.loggedInUser._id}`, state: { projectId: this.state.projectId, userId: this.state.userId } }}
                                                        render={elm => {
                                                            return <ProjectDetails />;
                                                        }}
                                                    >{elm.title}</Link>
                                                </ListGroup.Item>)}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Profile