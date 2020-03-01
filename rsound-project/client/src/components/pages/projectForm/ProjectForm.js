import React, { Component } from 'react'

import ProjectsServices from '../../../services/project.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FilesServices from '../../../services/files.services'

class ProjectForm extends Component {

    constructor(props) {
        super(props)
        this.projectServices = new ProjectsServices()
        this.filesServices = new FilesServices()
        this.state = {
            project: {
                title: '',
                description: '',
                parameters: '',
                imageUrl: ''
            }
        }
    }

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postProject = () => {
        this.projectServices.postProject(this.state.project)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            project: { ...this.state.project, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postProject()
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    coaster: { ...this.state.coaster, imageUrl: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={this.state.project.title} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.project.description} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Parameters</Form.Label>
                    <Form.Control type="text" name="parameters" value={this.state.project.length} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    {/* <Form.Control type="text" name="imageUrl" value={this.state.project.imageUrl} onChange={this.handleChange} /> */}
                </Form.Group>

                <Button variant="dark" type="submit">Create new project</Button>
            </Form>
        )
    }
}

export default ProjectForm