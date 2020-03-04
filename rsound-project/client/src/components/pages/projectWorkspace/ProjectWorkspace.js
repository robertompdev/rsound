import React, { Component } from 'react'
import Synth from './Synth'

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
                <Synth />
            </Container>
        )
    }
}

export default Project