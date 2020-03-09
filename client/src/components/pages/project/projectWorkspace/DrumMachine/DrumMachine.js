import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import './DrumMachine.css'

/* --- components import --- */
import Audio from './Parts/Audio'
import MSC from './Parts/MatrixStepsCreation'
import audio1 from './Samples/processed-kick-03.wav'
import audio2 from './Samples/processed-snare-04.wav'
import audio3 from './Samples/warm-tube-closedhat-rr3.wav'

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

    componentDidMount() {

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
            currentStepSouds.includes("BD") && this.startDB()
            currentStepSouds.includes("SN") && this.startSN()
            currentStepSouds.includes("HH") && this.startHH()
            currentStepSouds.includes("RT") && this.startRT()
        }

    }

    startDB() {
        let bd = new Audio();
        bd.src = "./Samples/processed-kick-03.wav"
        const audio = document.createElement("audio")
        audio.setAttribute("type", "audio/wav")
        audio.setAttribute("src", audio1)
        audio.play().then().catch(err => console.log({ err }))
    }

    startRT() {
        let time = Audio.context.currentTime
        let osc = Audio.context.createOscillator()
        let gain = Audio.context.createGain()
        osc = Audio.context.createOscillator()
        osc.frequency.setValueAtTime(1500, time);
        gain.gain.value = this.state.volume

        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.connect(gain) // Connect oscillator to gain
        gain.connect(Audio.context.destination) // Connect gain to output

        osc.start(time)
        osc.stop(time + 0.5)
    }

    startHH() {
        let bd = new Audio();
        bd.src = "./Samples/warm-tube-closedhat-rr3.wav"
        const audio = document.createElement("audio")
        audio.setAttribute("type", "audio/wav")
        audio.setAttribute("src", audio3)
        audio.play().then().catch(err => console.log({ err }))
    }

    startSN() {
        let bd = new Audio();
        bd.src = "./Samples/snare-04.wav"
        const audio = document.createElement("audio")
        audio.setAttribute("type", "audio/wav")
        audio.setAttribute("src", audio2)
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

        if (selectedCell.className.includes('selected')) {
            newSequence[stepNumber] = newSequence[stepNumber].filter(e => e !== selectedKey)
            selectedCell.className = `key-note ${stepNumber + 1}`
            selectedCell.style.background = "#FFE4D3"
        } else {
            newSequence[stepNumber] = selectedKey
            selectedCell.className = `key-note ${stepNumber + 1} selected`
            selectedCell.style.background = "#F16B24"
            switch (selectedKey) {
                case "HH":
                    this.startHH()
                    break;
                case "SN":
                    this.startSN()
                    break;
                case "RT":
                    this.startRT()
                    break;
                case "DB":
                    this.startDB()
                    break;
                default:
                    break;
            }
        }
        this.setState({ sequence: newSequence })
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={6}>
                        <div className="bt-dm mb-20">
                            <Button onClick={() => this.startDB()}>BD</Button>
                            <Button onClick={() => this.startSN()}>SN</Button>
                            <Button onClick={() => this.startRT()}>RT</Button>
                            <Button onClick={() => this.startHH()}>HH</Button>
                        </div>
                    </Col>
                    <Col md={11}>
                        <div>
                            <MSC matrixCellOnClick={() => this.matrixCellOnClick()} />
                        </div>
                        <hr />
                    </Col>
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