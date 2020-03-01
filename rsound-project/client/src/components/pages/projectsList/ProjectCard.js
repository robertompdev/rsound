import React from 'react'

import './ProjectCard.css'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const ProjectCard = ({ title, imageUrl, _id }) => {
    return (
        <Col md={4}>
            <Card className="card-project">
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <hr></hr>
                    <Button as="div" variant="dark" size="sm">
                        <Link to={`/detalles/${_id}`}>Details</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProjectCard