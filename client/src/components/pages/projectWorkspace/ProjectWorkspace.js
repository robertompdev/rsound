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
            bpm: 140,
            step: 1
        }
    }

    // Wave type selector updates 'wave' property in state
    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    playSeq() {
        let i = 0
        setInterval(() => {
            this.setState({ step: i })
            i++
            if (i % 16 === 0) { i = 0 }
        }, 1000 / (this.state.bpm / 30))
    }

    stopSeq() {
        for (let i = 0; i < 100; i++) {
            window.clearInterval(i)
        }
    }

    render() {
        return (
            <Container>
                <h3>Transport</h3>
                <Button className="transport" variant="light" type="submit" onClick={() => this.playSeq()} >Play</Button>
                <Button className="transport" variant="light" type="submit" onClick={() => this.stopSeq()} >Stop</Button>
                <p>BPM's ({this.state.bpm})</p>
                <input name="bpm" className="attack-slider" type="range" min="60" max="220" step="1" defaultValue={this.state.bpm}
                    onChange={this.onChange} />
                <hr />
                <h3>Synth A</h3>
                <Synth playStep={this.state.step} />
            </Container>
        )
    }
}

export default Project