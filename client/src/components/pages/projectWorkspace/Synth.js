import React, { Component } from 'react'

/* --- styling import --- */
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import './Synth.css'

/* --- json data import --- */
import octavesJson from '../../data/notes.json'

/* --- components import --- */
import MSC from './MatrixStepsCreation'


class Synth extends Component {

    constructor() {
        super()
        this.state = {
            attack: 0,
            decay: 1,
            sustain: 0.05,
            release: 0.15,
            wave: 'sawtooth',
            bpm: 140,
            sequence: [],
            octaves: octavesJson,
            matrix: []
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
        let audioCtx = new window.AudioContext()
        let osc = audioCtx.createOscillator()
        let gain = audioCtx.createGain()

        // Create OscillatorNode
        osc = audioCtx.createOscillator(); // Create sound source
        osc.type = this.state.wave // Sine wave
        osc.frequency.value = freq; // Frequency in hertz (passed from input button)
        osc.start(0); // Play oscillator instantly

        // Create GainNode	
        gain = audioCtx.createGain(); // Create gain node
        gain.gain.value = 1; // Set gain to full volume

        gain.gain.setTargetAtTime(0, audioCtx.currentTime + this.state.sustain, this.state.release) //Sustain Release

        // Connect the Nodes
        osc.connect(gain); // Connect oscillator to gain
        gain.connect(audioCtx.destination); // Connect gain to output
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    matrixCellOnClick(e) {

        alert("YAYAYAY")
        // e = e || window.event
        // e = e.target || e.srcElement
        // if (e.nodeName === 'TD') {
        //     let restOfKeys = document.getElementsByClassName(e.className)
        //     let newSequence = [...this.state.sequence]

        //     for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "transparent" }

        //     document.getElementById(e.id).style.background = "#F16B24"
        //     newSequence[parseInt(e.id.substring(e.id.length - 2))] = e.id.substring(0, e.id.length - 3)

        //     this.setState({ sequence: newSequence })

        //     console.log(newSequence)
        // }
    }

    render() {
        return (
            <>
                <p>Wave Type</p>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" value={this.state.attack}
                        onChange={this.onChange}>
                        Wave Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item value="sine">Sine</Dropdown.Item>
                        <Dropdown.Item value="triangle">Triangle</Dropdown.Item>
                        <Dropdown.Item value="sqaure">Square</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <hr />
                <div className="div-seq">
                    <p>Pattern Sequencer</p>
                    <Button variant="light" type="submit" onClick={() => this.playSeq()} >Play Pattern</Button>
                    <hr />
                    <MSC />
                </div>





                {/* CONTROLES ADSR */}
                <hr />
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

                {/* MAPPING DE JSON PARA GENERAR TECLAS */}
                <hr />
                {
                    this.state.octaves.octaves.one.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}1</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.two.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}2</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.three.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}3</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.four.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}4</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.five.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}5</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.six.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}6</Button>
                    ))
                }
                <hr />
                {
                    this.state.octaves.octaves.seven.map((note, index) => (
                        <Button variant="light" type="submit" onClick={() => this.startOsc(note.frequency)} key={index}>{note.note}7</Button>
                    ))
                }
                <hr />
            </>
        )
    }
}

export default Synth