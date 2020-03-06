import React, { Component } from 'react'

/* --- components import --- */
import Synth from './Synth'

/* --- styling import --- */
import Container from 'react-bootstrap/Container'

class Project extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {

        return (
            <Container>
                <h3>Synth A</h3>
                <Synth />
            </Container>
        )
    }
}

export default Project