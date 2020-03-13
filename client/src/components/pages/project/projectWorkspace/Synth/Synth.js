import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import './Synth.css'

/* --- json data import --- */
import octavesJson from '../../../../../../src/components/data/notesSimplified.json'

/* --- components import --- */
import MSC from './Parts/MatrixStepsCreation'
import Audio from './Parts/Audio'

class Synth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attack: 0,
            decay: 1,
            octaves: octavesJson,
            release: 0.15,
            sequence: ["NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote"],
            sustain: 0.05,
            sustainMax: 0.05,
            volume: 1,
            wave: 'sawtooth',
            selectedResolution: 15,
            step: 0
        }
    }

    componentDidMount() {

        this.setState({ sequence: this.props.sequence, wave: this.props.wave, selectedResolution: this.props.selectedResolution })
        document.addEventListener("keydown", this.handleKeyDown, false)
        this.colorNotesSavedInProject()
    }

    colorNotesSavedInProject() {
        this.state.sequence.forEach(elem =>
            console.log(elem))
        //document.getElementsByClassName(elem).style..background = "#F16B24")
    }

    // If parent matrix step property updates, then it plays next note from the sequence in the array
    componentDidUpdate(prevProps) {
        if (prevProps.playStep !== this.props.playStep) {
            if (this.props.playStep % parseInt(this.state.selectedResolution) === 0) {
                this.playSequence()
            }
        }
        this.colorCurrentStep()
    }

    // Audio Node
    startOsc = (freq) => {
        let osc = Audio.context.createOscillator()
        let gain = Audio.context.createGain()

        // Create OscillatorNode
        osc = Audio.context.createOscillator() // Create sound source
        osc.type = this.state.wave
        freq ? osc.frequency.value = freq : osc.frequency.value = 0 // Frequency in hertz (passed from input button)
        osc.start(0) // Play oscillator instantly

        // Create GainNode	
        gain = Audio.context.createGain() // Create gain node
        gain.gain.value = this.state.volume // Set gain to full volume

        gain.gain.setTargetAtTime(0, Audio.context.currentTime + this.state.sustain, this.state.release) //Sustain Release

        // Connect the Nodes
        osc.connect(gain) // Connect oscillator to gain
        gain.connect(Audio.context.destination) // Connect gain to output
    }

    // Reset sequence to step index zero 
    setStepToZero() { this.setState({ step: 0 }) }

    // Plays the note stored in the index array
    playSequence() {
        this.setState({ step: this.state.step + 1 })
        if (this.state.step === 15) { this.setStepToZero() }
        this.startOsc(octavesJson[this.state.sequence[this.state.step]])
    }

    // Wave type selector updates 'wave' property in state
    handleSelectionChanged = (e) => {
        this.setState({ wave: e.target.value })
    }

    // Note resolution type selector updates 'selectedResolution' property in state
    handleResolutionChanged = (e) => {
        this.setState({ selectedResolution: e.target.value })
    }

    handleKeyDown(event) {
        if (event.keyCode === 65) {
            console.log('esta es la A')
            //this.startOsc('C1')
        }
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value, sustainMax: this.state.release - 0.05 < 0 ? 0 : this.state.release - 0.05 })
    }

    // Matrix step selection logic
    matrixCellOnClick = (e) => {
        e = e || window.event
        e = e.target || e.srcElement

        let newSequence = [...this.state.sequence]
        let restOfKeys = document.getElementsByClassName(e.className)
        let stepNumber = parseInt(e.id.slice(-2)) - 1
        let selectedKey = e.id.split('0')[0]
        let selectedCell = document.getElementById(e.id)

        for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "#FFE4D3" }

        if (selectedCell.className.includes('selected')) {
            newSequence[stepNumber] = "NoNote"
            selectedCell.className = `key-note ${stepNumber + 1}`
        } else {
            newSequence[stepNumber] = selectedKey
            selectedCell.className = `key-note ${stepNumber + 1} selected`
            selectedCell.style.background = "#F16B24"
            this.startOsc(octavesJson[selectedKey])
        }

        this.setState({ sequence: newSequence })
    }

    colorCurrentStep() {
        let allStepHeaders = document.getElementsByClassName("step-header")
        allStepHeaders = [...allStepHeaders]

        allStepHeaders.forEach(elm => {

            if (parseInt(elm.id.slice(-2)) - 1 === this.state.step) {
                let selectedCell = document.getElementById(`step-header ${this.state.step}`)
                for (let i = 0; i < allStepHeaders.length; i++) { allStepHeaders[i].style.backgroundColor = "#555B6E" }
                if (selectedCell) { selectedCell.style.background = "#F16B24" }

            }
        })
    }

    clearAllSynth() {
        let allStepHeaders = document.getElementsByClassName("step-header")
        let restOfKeys = document.getElementsByClassName('key-note')
        for (let i = 0; i < allStepHeaders.length; i++) { allStepHeaders[i].style.backgroundColor = "#555B6E" }
        for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "#FFE4D3" }
    }

    render() {
        let handleToUpdateSynth = this.props.handleToUpdateSynth
        return (
            <>
                <Row className="mb-20">
                    {/* MATRIX STEP SEQUENCER */}
                    <Col md={12}>
                        <h4>Pattern Sequencer</h4>
                    </Col>

                    <div className="div-seq">
                        <MSC className="text-center" matrixCellOnClick={() => {
                            this.matrixCellOnClick()
                            handleToUpdateSynth(this.state.sequence, this.state.wave, this.state.selectedResolution)
                        }
                        } />
                    </div>
                    {/* // <input type="text" onKeyDown={this.handleKeyDown} /> */}
                    <hr />
                </Row>
                <Row className="text-center ">
                    <Col md={4} className="text-center">
                        {/* WAVE TYPE SELECTOR */}
                        <h4>Wave Type</h4>
                        <select className="form-control" onChange={this.handleSelectionChanged} defaultValue={this.state.wave}>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                        </select>
                        {/* VOLUME CONTROL */}
                        <h4>Volume {Number.parseInt(this.state.volume * 100)}</h4>
                        <input name="volume" className="volume-slider" type="range" min="0" max="1" step="0.01" defaultValue={this.state.volume}
                            onChange={this.onChange} />
                    </Col>
                    <Col md={4} className="text-center">
                        {/* CONTROLES ADSR */}
                        <h4>Envelope</h4>
                        <p>Sustain {Number.parseInt(this.state.sustain * 100)}</p>
                        <input name="sustain" className="sustain-slider" type="range" min="0" max={this.state.release} step="0.01" defaultValue={this.state.sustain}
                            onChange={this.onChange} />
                        <p>Release {this.state.release * 100}</p>
                        <input name="release" className="release-slider" type="range" min="0" max="0.3" step="0.01" defaultValue={this.state.release}
                            onChange={this.onChange} />
                    </Col>
                    <Col md={4} className="text-center">
                        <h4>Step Length</h4>
                        <select className="form-control" onChange={this.handleResolutionChanged} defaultValue="15">
                            <option value="120" >1/1</option>
                            <option value="60" >1/2</option>
                            <option value="30" >1/4</option>
                            <option value="15" defaultValue>1/8</option>
                            <option value="7.5" >1/16</option>
                            <option value="3.75" >1/32</option>
                            <option value="1.875" >1/64</option>
                        </select>
                        <Button variant='light' onClick={() => this.clearAllSynth()}>Clear Synth Notes</Button>
                    </Col>
                    <hr />
                </Row>
            </>
        )
    }
}

export default Synth