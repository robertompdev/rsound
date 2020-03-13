import React, { Component } from 'react'

/*--- Import Services ---*/
import ProjectsServices from '../../../../services/project.services'
import FilesServices from '../../../../services/files.services'

/*--- Import Styling ---*/
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import mongoose from 'mongoose'

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
                imageUrl: '',
                autor: mongoose.Types.ObjectId(),
            }
        }
    }

    componentDidMount() {
        // console.log(this.props.userId)

        this.setState({ autor: mongoose.Types.ObjectId(this.props.userId) })
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
                    project: { ...this.state.project, imageUrl: response.secure_url }
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
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    {/* <Form.Control type="text" name="imageUrl" value={this.state.project.imageUrl} onChange={this.handleChange} /> */}
                </Form.Group>
                <Button variant="light" type="submit">Create new project</Button>
            </Form>
        )
    }
}

export default ProjectForm