import React, { Component } from 'react'

/* --- styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import './DrumMachine.css'

/* --- components import --- */
import Audio from './Audio'

class DrumMachine extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedResolution: 15,
            volume: 1,
            step: 0,
            dmSeq: [["BD"], [], [], [], ["SN", "BD"], [], [], [], ["BD"], [], [], [], ["SN", "BD"], [], [], [], ["BD"], [], [], ["HH"]]
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
            currentStepSouds.includes("BD") && this.startDB()
            currentStepSouds.includes("SN") && this.startSN()
            currentStepSouds.includes("HH") && this.startHH()
            currentStepSouds.includes("RT") && this.startRT()
        }

    }

    startDB() {
        let time = Audio.context.currentTime
        let osc = Audio.context.createOscillator()
        let gain = Audio.context.createGain()
        osc = Audio.context.createOscillator()
        osc.frequency.setValueAtTime(150, time);
        gain.gain.value = this.state.volume

        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.connect(gain) // Connect oscillator to gain
        gain.connect(Audio.context.destination) // Connect gain to output

        osc.start(time)
        osc.stop(time + 0.5)
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
        let time = Audio.context.currentTime
        let osc = Audio.context.createOscillator()
        let gain = Audio.context.createGain()
        osc = Audio.context.createOscillator()
        osc.frequency.setValueAtTime(6000, time);
        gain.gain.value = this.state.volume

        osc.frequency.exponentialRampToValueAtTime(0.06, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.02, time + 0.1);

        osc.connect(gain) // Connect oscillator to gain
        gain.connect(Audio.context.destination) // Connect gain to output

        osc.start(time)
        osc.stop(time + 0.05)
    }

    startSN() {
        let audioContext = Audio.context
        let time = audioContext.currentTime
        let node = audioContext.createBufferSource(),
            buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
            data = buffer.getChannelData(0);

        for (var i = 0; i < 4096; i++) {
            data[i] = Math.random();
        }

        node.buffer = buffer;
        node.loop = true;
        node.start(time)
        node.stop(time + 0.2)
        node.connect(audioContext.destination)

        let filter = audioContext.createBiquadFilter()
        filter.type = "highpass"

        filter.frequency.setValueAtTime(100, time)
        filter.frequency.linearRampToValueAtTime(1000, time + 1)

        let noiseEnvelope = audioContext.createGain()
        filter.connect(noiseEnvelope);

        noiseEnvelope.gain.setValueAtTime(1, time)
        noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2)
        noiseEnvelope.connect(audioContext.destination)

        let osc = audioContext.createOscillator();
        osc.type = 'triangle';

        let oscEnvelope = audioContext.createGain();
        osc.connect(oscEnvelope);

        osc.frequency.setValueAtTime(100, time);
        oscEnvelope.gain.setValueAtTime(0.7, time);
        oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        osc.start(time)

        osc.stop(time + 0.2);
        //noise.stop(time + 0.2);
        oscEnvelope.connect(audioContext.destination);
    }

    render() {
        return (
            <>
                <Row>
                    <div className="div-seq-drum">
                        <Button onClick={() => this.startDB()}>BD</Button>
                        <Button onClick={() => this.startSN()}>SN</Button>
                        <Button onClick={() => this.startRT()}>RT</Button>
                        <Button onClick={() => this.startHH()}>HH</Button>
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

export default DrumMachine