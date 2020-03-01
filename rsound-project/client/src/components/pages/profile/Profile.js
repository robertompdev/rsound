import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const Profile = props => {
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <h2><span className='user-name'>{props.loggedInUser.username}</span> you're in your profile page. Have fun!</h2>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Card className="propfile">
                            <Card.Img variant="top" src={props.loggedInUser.imageUrl} />
                            <Card.Body>
                                <Card.Title>{props.loggedInUser.username}</Card.Title>
                                <hr></hr>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile