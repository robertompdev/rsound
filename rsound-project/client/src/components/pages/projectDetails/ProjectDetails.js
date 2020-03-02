import React, { Component } from 'react'

import ProjectServices from '../../../services/project.services'

import './project-details.css'

import Container from 'react-bootstrap/Container'

class ProjectDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { projectr: {} }
        this.services = new ProjectServices()

        console.log('las props por defecto serían estas:', this.props)
    }

    componentDidMount = () => this.getProjectDetails()

    getProjectDetails = () => {
        this.services.getProjectDetails(this.props.match.params.id)
            .then(theProject => this.setState({ project: theProject }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className="project-details">
                <h1>PROJECT DETAILS</h1>
                {/* <h1>{this.state.project.title}</h1> */}
            </Container>
        )
    }
}

export default ProjectDetails