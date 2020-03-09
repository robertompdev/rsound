import React, { Component } from 'react'

/* --- components import --- */
import Services from '../../../../services/project.services'
import Project from '../projectWorkspace/ProjectWorkspace'

/* --- styling import --- */
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import './project-details.css'

class ProjectDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { project: {} }
        this.services = new Services()
    }

    componentDidMount = () => this.getProjectsDetails()

    getProjectsDetails = () => {
        this.services.getProjectsDetails(this.props.match.params.id)
            .then(theProject => this.setState({ project: theProject }))
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.project)
        return (
            <Container className="project-details">
                <h1>Project Details</h1>
                <Card className="card-project">
                    <Card.Body>
                        <Row>
                            <Col md={9}>
                                <h2>{this.state.project.title}</h2>
                                <p>Description: {this.state.project.description}</p>
                            </Col>
                            <Col md={3}>
                                <Card.Img variant="top" src={this.state.project.imageUrl} />
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col md={12}>
                                <Project />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default ProjectDetails