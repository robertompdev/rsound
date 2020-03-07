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
            if (i % 3200 === 0) { i = 0 }
        }, 1000 / this.state.bpm)
    }

    stopSeq() {
        for (let i = 0; i < 100; i++) {
            window.clearInterval(i)
            this.setState({ step: 0 })
        }
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
                    <Col md={6}>
                        <Button className="transport m-10" variant="light" type="submit" onClick={() => this.playSeq()} >Play</Button>
                        <Button className="transport m-10" variant="light" type="submit" onClick={() => this.stopSeq()} >Stop</Button>
                    </Col >
                    <Col md={6}>
                        <h4>Tempo {this.state.bpm} BPM's</h4>
                        <input name="bpm" className="bpm-slider m-10" type="range" min="50" max="240" step="1" defaultValue={this.state.bpm}
                            onChange={this.onChange} />
                    </Col>
                    {/* <Col md={3}>
                        <h4>Swing</h4>
                    </Col> */}
                </Row>
                <hr />
                <h3>Synth A</h3>
                <Synth className="md-10" playStep={this.state.step} bpm={this.state.bpm} />
                <hr />
                <h3>Synth B</h3>
                {/* <Synth playStep={this.state.step} /> */}
                <hr />
                <h3>Drum Machine</h3>
                <DrumMachine playStep={this.state.step} bpm={this.state.bpm} />
            </Container >
        )
    }
}

export default Project