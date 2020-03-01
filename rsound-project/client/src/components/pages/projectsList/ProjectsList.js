import React, { Component } from 'react'

import ProjectsServices from '../../../services/project.services'

import ProjectForm from '../projectForm/ProjectForm'
import ProjectCard from './ProjectCard'

import Container from 'react-bootstrap/Container'
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
        this.services = new ProjectsServices()
    }

    componentDidMount = () => this.getAllProjects()

    getAllProjects = () => {
        this.services.getAllProjects()
            .then(allProjects => this.setState({ projects: allProjects }))
            .catch(err => console.log(err))
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Projects</h1>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Create project</Button>}

                {this.state.projects.length ? (
                    <Row>
                        {this.state.projects.map(elm => <ProjectCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>LOADING...</p>

                }

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>New project</h3>
                        <hr></hr>
                        <ProjectForm closeModal={this.closeModal} refreshList={this.getAllProjects} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default ProjectsList