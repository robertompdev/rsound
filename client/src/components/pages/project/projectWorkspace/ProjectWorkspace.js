import React, { Component } from 'react'

/*--- Import services ---*/
import ProjectsServices from '../../../../services/project.services'

/* --- components import --- */
import Synth from './Synth/Synth'
import DrumMachine from './DrumMachine/DrumMachine'

/* --- styling import --- */
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

/* --- react-router-dom import --- */
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class Project extends Component {

    constructor(props) {
        super(props)
        this.projectServices = new ProjectsServices()
        this.state = {
            user: {},
            bpm: 120,
            step: 1,
            attack: 0,
            decay: 1,
            release: 0.15,
            sequence: [],
            sustain: 0.05,
            wave: 'sawtooth',
            selectedResolution: 15,
            dmSeq: []
        }
    }

    componentDidMount = () => {
        console.log(this.props)
    }

    // Wave type selector updates 'wave' property in state
    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    // Interval starts
    playSeq() {
        let i = 0
        setInterval(() => {
            this.setState({ step: i })
            i++
            if (i % 3200 === 0) { i = 0 }
        }, 1000 / this.state.bpm)
    }

    // Interval stopped and cleared
    stopSeq() {
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i)
    }

    // Unpdate drum machne sequence from child component
    handleToUpdateDM = (sequence) => {
        this.setState({ dmSeq: sequence })
    }

    // Unpdate synth sequence from child component
    handleToUpdateSynth = (sequence, release, sustain, wave, selectedResolution) => {
        this.setState({ sequence: sequence, release: release, sustain: sustain, wave: wave, selectedResolution: selectedResolution })
    }

    saveProject = () => {
        this.projectServices.saveProject(this.props.projectId, this.state)
            .then(theProject => console.log('put', theProject))
            .catch(err => console.log(err))
    }

    queEsProps = () => console.log(this.props)

    render() {
        return (
            <Router>
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
                        <Button className="transport m-10" variant="light" type="submit" id={this.props.id} onClick={this.saveProject}>Save Changes</Button>
                    </Col>
                </Row>
                <hr />
                <h3>Synth A</h3>
                <Synth className="md-10" playStep={this.state.step} bpm={this.state.bpm} handleToUpdateSynth={this.handleToUpdateSynth} />
                <hr />
                <h3>Drum Machine</h3>
                <DrumMachine playStep={this.state.step} bpm={this.state.bpm} handleToUpdateDM={this.handleToUpdateDM} />
            </Router>
        )
    }
}

export default Project