import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './DrumMachine.css'

/* --- json data import --- */
import octavesJson from '../../../data/notesSimplified.json'

/* --- components import --- */
import MSC from './MatrixStepsCreation'
import Audio from './Audio'

class Synth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attack: 0,
            decay: 1,
            octaves: octavesJson,
            release: 0.02,
            sequence: ["NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote", "NoNote"],
            sustain: 0.02,
            volume: 1,
            wave: 'sine',
        }
    }

    ///HACER LOS SONIDOS DE LA DRUM MACHINE EN ARCHIVO APARTE


    // If parent matrix step changes, then it plays a note from the sequence in the array
    componentDidUpdate(prevProps) {
        if (prevProps.playStep !== this.props.playStep) {
            this.playSequence()
        }
    }

    // Plays the note stored in the index array
    playSequence() {
        this.startOsc(octavesJson[this.state.sequence[this.props.playStep]])
    }

    // Wave type selector updates 'wave' property in state
    handleSelectionChanged = (e) => {
        this.setState({
            wave: e.target.value
        })
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    // Matrix step selection logic
    matrixCellOnClick = (e) => {
        e = e || window.event
        e = e.target || e.srcElement
        console.log(e)
        let newSequence = [...this.state.sequence]
        let restOfKeys = document.getElementsByClassName(e.className)
        let stepNumber = parseInt(e.id.slice(-2)) - 1
        let selectedKey = e.id.split('0')[0]
        let selectedCell = document.getElementById(e.id)

        for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "#FFE4D3" }

        if (selectedCell.className.includes('selected')) {
            newSequence[stepNumber] = ""
            selectedCell.className = `drum-note ${stepNumber + 1}`
        } else {
            newSequence[stepNumber] = selectedKey
            selectedCell.className = `drum-note ${stepNumber + 1} selected`
            selectedCell.style.background = "#F16B24"
            this.startOsc(octavesJson[selectedKey])
        }

        this.setState({ sequence: newSequence })

        console.log(this.state.sequence)
    }

    render() {
        return (
            <>
                <Row>
                    {/* MATRIX STEP SEQUENCER */}
                    <Col md={12}>
                        <h4>Pattern Sequencer</h4>
                    </Col>

                    <div className="div-seq-drum">
                        <MSC matrixCellOnClick={() => this.matrixCellOnClick()} />
                    </div>
                    <hr />
                </Row>
                <Row>
                    <Col md={2}>
                        {/* VOLUME CONTROL */}
                        <h4>Volume {Number.parseInt(this.state.volume * 100)}</h4>
                        <input name="volume" className="volume-slider" type="range" min="0" max="1" step="0.01" defaultValue={this.state.volume}
                            onChange={this.onChange} />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Synth