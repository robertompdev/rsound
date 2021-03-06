import React, { Component } from 'react'

/* --- services import --- */
import ProjectsServices from '../../../../services/project.services'

/* --- components import --- */
import ProjectForm from '../projectForm/ProjectForm'
import ProjectCard from './ProjectCard'

/* --- styling import --- */
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class ProjectsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            showmodal: false
        }
        this.ProjectServices = new ProjectsServices()
    }

    componentDidMount = () => {
        this.getAllProjects()
    }

    getAllProjects = () => {
        this.ProjectServices.getAllProjects()
            .then(allProjects => {
                this.setState({ projects: allProjects })
            })
            .catch(err => console.log(err))
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {
        return (
            <Container>
                <h1>Projects</h1>
                <Row>
                    <Col>
                        {this.props.loggedInUser && <Button className="mb-20" variant="light" onClick={this.openModal}>Create project</Button>}
                    </Col>
                </Row>
                <Row>
                    {this.state.projects.length ? (
                        <>
                            {this.state.projects.map(elm => <ProjectCard key={elm._id} {...elm} loggedInUser={this.props.loggedInUser} />)}
                        </>
                    )
                        :
                        <div className="loading">
                            <div className="spinner-border"></div>
                        </div>
                    }
                </Row>
                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3 className="orange-text">New project</h3>
                        <hr></hr>
                        <ProjectForm closeModal={this.closeModal} refreshList={this.getAllProjects} userId={this.props.loggedInUser._id} />
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default ProjectsList