import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import './Profile.css'

const Profile = props => {
    return (
        <>
            <Container >
                <Row className="justify-content-md-center">
                    <h2><span className='user-name'>{props.loggedInUser.username}</span> you're in your profile page. Have fun!</h2>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card className="profile">
                            <Card.Body >
                                {/* <Card.Title><h4>{props.loggedInUser.username}</h4></Card.Title> */}
                                <Row>
                                    <Col md={3}>
                                        {props.loggedInUser.imageUrl ? <Card.Img variant="top" src={props.loggedInUser.imageUrl} /> : <div className="initial-letter">{props.loggedInUser.username.charAt(0)}</div>}
                                    </Col>
                                    <Col md={8} className="user-projects">
                                        {props.loggedInUser.projects ? <p>{props.loggedInUser.projects}</p> : <p>It seems you haven't created your first project yet.</p>}
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

export default Profile