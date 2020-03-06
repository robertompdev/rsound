import React, { Component } from 'react'

/* --- components import --- */
import Synth from './Synth/Synth'

/* --- styling import --- */
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Project extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    playSeq() {
        let i = 0
        setInterval(() => {
            console.log(i, this.state.sequence[i], this.state.sequence.length - 1)
            i === this.state.sequence.length - 1 ? this.playSeq() : this.startOsc(this.state.sequence[i])
            i++
        }, 1000 / (this.state.bpm / 30))
    }

    render() {

        return (
            <Container>
                <h3>Transport</h3>
                <Button variant="light" type="submit" onClick={() => this.playSeq()} >Play</Button>
                <Button variant="light" type="submit" >Stop</Button>
                <hr />
                <h3>Synth A</h3>
                <Synth />
            </Container>
        )
    }
}

export default Project