import React, { Component } from 'react'

/* --- components import --- */
import Synth from './Synth/Synth'
import DrumMachine from './DrumMachine/DrumMachine'

/* --- styling import --- */
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Project extends Component {

    constructor() {
        super()
        this.state = {
            bpm: 120,
            step: 1,
            synth1:
            {
                attack: { type: Number, default: 0 },
                decay: { type: Number, default: 1 },
                release: { type: Number, default: 0.15 },
                sequence: Array,
                sustain: { type: Number, default: 0.05 },
                wave: { type: String, default: 'sawtooth' },
                selectedResolution: { type: Number, default: 15 }
            },
            synth2: {
                attack: { type: Number, default: 0 },
                decay: { type: Number, default: 1 },
                release: { type: Number, default: 0.15 },
                sequence: Array,
                sustain: { type: Number, default: 0.05 },
                wave: { type: String, default: 'triangle' },
                selectedResolution: { type: Number, default: 15 }
            },
            drumMachine: {
                dmSeq: Array
            },
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
            if (i % 3200 === 0) { i = 0 }
        }, 1000 / this.state.bpm)
    }

    stopSeq() {
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>Transport</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button className="transport m-10" variant="light" type="submit" onClick={() => this.playSeq()} >Play</Button>
                        <Button className="transport m-10" variant="light" type="submit" onClick={() => this.stopSeq()} >Stop</Button>
                    </Col >
                    <Col md={4}>
                        <h4>Tempo {this.state.bpm} BPM's</h4>
                        <input name="bpm" className="bpm-slider m-10" type="range" min="50" max="240" step="1" defaultValue={this.state.bpm}
                            onChange={this.onChange} />
                    </Col>
                    <Col md={4}>
                        <Button className="transport m-10" variant="light" type="submit" >Save Changes</Button>
                    </Col>
                </Row>
                <hr />
                <h3>Synth A</h3>
                <Synth className="md-10" playStep={this.state.step} bpm={this.state.bpm} />
                <hr />
                <h3>Drum Machine</h3>
                <DrumMachine playStep={this.state.step} bpm={this.state.bpm} />
            </Container >
        )
    }
}

export default Project