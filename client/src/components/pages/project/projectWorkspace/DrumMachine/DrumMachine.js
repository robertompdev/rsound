import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import './DrumMachine.css'

/* --- components import --- */
import Audio from './Parts/Audio'
import MSC from './Parts/MatrixStepsCreation'

/* --- audio files import --- */
import audio1 from './Samples/processed-kick-03.wav'
import audio2 from './Samples/processed-snare-04.wav'
import audio3 from './Samples/warm-tube-closedhat-rr3.wav'
import audio4 from './Samples/warm-tube-clap02-rr4.wav'

class DrumMachine extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedResolution: 15,
            volume: 1,
            step: 0,
            dmSeq: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        }
    }

    // If parent matrix step property updates, then it plays next note from the sequence in the array
    componentDidUpdate(prevProps) {
        if (prevProps.playStep !== this.props.playStep) {
            if (this.props.playStep % parseInt(this.state.selectedResolution) === 0) {
                this.playSequence()
            }
        }
    }

    // Reset sequence to step index zero 
    setStepToZero() { this.setState({ step: 0 }) }

    // Plays the note stored in the index array
    playSequence() {
        let currentStepSouds = this.state.dmSeq[this.state.step]
        this.setState({ step: this.state.step + 1 })
        this.state.step === 15 && this.setStepToZero()
        if (currentStepSouds !== "") {
            currentStepSouds.includes("BD") && this.startSample("BD")
            currentStepSouds.includes("SN") && this.startSample("SN")
            currentStepSouds.includes("HH") && this.startSample("HH")
            currentStepSouds.includes("CP") && this.startSample("CP")
        }
    }

    startSample(sample) {
        let file = new Audio()
        const audio = document.createElement("audio")
        audio.setAttribute("type", "audio/wav")
        switch (sample) {
            case "BD":
                file.src = "./Samples/processed-kick-03.wav"
                audio.setAttribute("src", audio1)
                break;
            case "HH":
                file.src = "./Samples/warm-tube-closedhat-rr3.wav"
                audio.setAttribute("src", audio3)
                break;
            case "SN":
                file.src = "./Samples/snare-04.wav"
                audio.setAttribute("src", audio2)
                break;
            case "CP":
                file.src = "./Samples/warm-tube-clap02-rr4.wav"
                audio.setAttribute("src", audio4)
                break;
            default:
                break;
        }
        audio.play().then().catch(err => console.log({ err }))
    }

    matrixCellOnClick = (e) => {
        e = e || window.event
        e = e.target || e.srcElement

        let newSequence = [...this.state.dmSeq]
        let stepNumber = parseInt(e.id.slice(-2)) - 1
        let selectedKey = e.id.split('0')[0]
        let selectedCell = document.getElementById(e.id)

        newSequence[stepNumber].push(selectedKey)

        if (selectedCell.className.includes('elected')) {
            console.log(selectedKey)
            newSequence[stepNumber] = [...newSequence[stepNumber].filter(e => e !== selectedKey)]
            selectedCell.className = `drum-note ${stepNumber + 1}`
            selectedCell.style.background = "#FFE4D3"
            console.log(newSequence[stepNumber])
        } else {
            newSequence[stepNumber] = selectedKey
            selectedCell.className = `drum-note ${stepNumber + 1} elected`
            selectedCell.style.background = "#F16B24"
            switch (selectedKey) {
                case "HH":
                    this.startSample("HH")
                    break;
                case "SN":
                    this.startSample("SN")
                    break;
                case "CP":
                    this.startSample("CP")
                    break;
                case "DB":
                    this.startSample("DB")
                    break;
                default:
                    break;
            }
        }
        this.setState({ sequence: newSequence })
    }

    render() {
        let handleToUpdateDM = this.props.handleToUpdateDM
        return (
            <>
                <Row>
                    <Col md={6}>
                        <div className="bt-dm mb-20">
                            <Button onClick={() => this.startSample("BD")}>BD</Button>
                            <Button onClick={() => this.startSample("SN")}>SN</Button>
                            <Button onClick={() => this.startSample("CP")}>CP</Button>
                            <Button onClick={() => this.startSample("HH")}>HH</Button>
                        </div>
                    </Col>

                    <div>
                        <MSC matrixCellOnClick={() => {
                            this.matrixCellOnClick()
                            handleToUpdateDM(this.state.dmSeq)
                        }} />
                    </div>

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

export default DrumMachine