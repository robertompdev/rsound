import React, { Component } from 'react'

/* --- styling import --- */
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Synth.css'

/* --- json data import --- */
import octavesJson from '../../data/notesSimplified.json'

/* --- components import --- */
import MSC from './MatrixStepsCreation'


class Synth extends Component {

    constructor() {
        super()
        this.state = {
            attack: 0,
            audioCtx: new window.AudioContext(),
            bpm: 140,
            decay: 1,
            matrix: [],
            octaves: octavesJson,
            release: 0.15,
            sequence: [],
            sustain: 0.05,
            wave: 'sawtooth'
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

    startOsc = (freq) => {
        let audioCtx = this.state.audioCtx
        let osc = audioCtx.createOscillator()
        let gain = audioCtx.createGain()

        // Create OscillatorNode
        osc = audioCtx.createOscillator() // Create sound source
        osc.type = this.state.wave
        osc.frequency.value = freq // Frequency in hertz (passed from input button)
        osc.start(0) // Play oscillator instantly

        // Create GainNode	
        gain = audioCtx.createGain() // Create gain node
        gain.gain.value = 1 // Set gain to full volume

        gain.gain.setTargetAtTime(0, audioCtx.currentTime + this.state.sustain, this.state.release) //Sustain Release

        // Connect the Nodes
        osc.connect(gain) // Connect oscillator to gain
        gain.connect(audioCtx.destination) // Connect gain to output
    }

    // Wave type selector updates 'wave' property in state
    handleSelectionChanged = (e) => {
        this.setState({
            wave: e.target.value
        })
    }

    // 
    matrixCellOnClick = (e) => {
        e = e || window.event
        e = e.target || e.srcElement

        if (e.className.includes('key-note')) {
            let newSequence = [...this.state.sequence]
            let restOfKeys = document.getElementsByClassName(e.className)
            let stepNumber = parseInt(e.id.slice(-2)) - 1
            let selectedKey = e.id.split('0')[0]
            let selectedCell = document.getElementById(e.id)

            if (selectedCell.style.background === "#F16B24") {
                newSequence[stepNumber] = ""
                selectedCell.style.background = "#FFE4D3"
            } else {

                for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "#FFE4D3" }

                newSequence[stepNumber] = selectedKey
                this.setState({ sequence: newSequence })
                selectedCell.style.background = "#F16B24"
            }
            this.startOsc(octavesJson[selectedKey])
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={12}>
                        {/* MATRIX STEP SEQUENCER */}
                        <h4>Pattern Sequencer</h4>
                        <Button variant="light" type="submit" onClick={() => this.playSeq()} >Play Pattern</Button>
                    </Col>
                    <Col md={1}>
                        <div className="step-header">
                            Notes
                        </div>
                    </Col >
                    <div className="div-seq">
                        <MSC matrixCellOnClick={() => this.matrixCellOnClick()} />
                    </div>
                    <hr />
                </Row>
                <Row>
                    <Col md={2}>
                        {/* WAVE TYPE SELECTOR */}
                        <h4>Wave Type</h4>
                        <select className="form-control" onChange={this.handleSelectionChanged} defaultValue="sine">
                            <option value="sine" defaultValue>Sine</option>
                            <option value="triangle">Triangle</option>
                            <option value="square">Square</option>
                        </select>
                    </Col>
                    <Col md={10}>
                        {/* CONTROLES ADSR */}
                        <h3>Envelope</h3>
                        <p>Attack {Number.parseInt(this.state.attack * 100)}</p>
                        <input name="attack" className="attack-slider" type="range" min="0" max="1" step="0.01" value={this.state.attack}
                            onChange={this.onChange} />
                        <p>Decay {Number.parseInt(this.state.decay * 100)}</p>
                        <input name="decay" className="decay-slider" type="range" min="0" max="1" step="0.01" value={this.state.decay}
                            onChange={this.onChange} />
                        <p>Sustain {Number.parseInt(this.state.sustain * 100)}</p>
                        <input name="sustain" className="sustain-slider" type="range" min="0" max="1" step="0.01" value={this.state.sustain}
                            onChange={this.onChange} />
                        <p>Release {this.state.release * 100}</p>
                        <input name="release" className="release-slider" type="range" min="0" max="1" step="0.01" value={this.state.release}
                            onChange={this.onChange} />
                    </Col>
                    <hr />
                </Row>




                {/* MAPPING DE JSON PARA GENERAR TECLAS */}
                {/* <hr />
                {
                    this.state.octaves.octaves.one.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}1</Button>
                    ))
                }
            */}
            </>
        )
    }
}

export default Synth