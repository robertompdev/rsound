import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'

import './Synth.css'

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
            sequence: []

        }
    }

    playSeq() {
        let i = 0;
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
        e = e || window.event
        e = e.target || e.srcElement
        if (e.nodeName === 'TD') {
            let restOfKeys = document.getElementsByClassName(e.className)
            let newSequence = [...this.state.sequence]

            for (let i = 0; i < restOfKeys.length; i++) { restOfKeys[i].style.backgroundColor = "transparent" }

            document.getElementById(e.id).style.background = "#F16B24"
            newSequence[parseInt(e.id.substring(e.id.length - 2))] = e.id.substring(0, e.id.length - 3)

            this.setState({ sequence: newSequence })

            console.log(newSequence)
        }
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
                <p>Pattern Sequencer</p>
                <Button variant="light" type="submit" onClick={() => this.playSeq()} >Play Pattern</Button>
                <div className="div-seq">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Note</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                                <th>13</th>
                                <th>14</th>
                                <th>15</th>
                                <th>16</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Octava 1 */}
                            <tr className="octave-one">
                                <td>C1</td>
                                <td id="C1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>C#1</td>
                                <td id="C#1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D1</td>
                                <td id="D1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D#1</td>
                                <td id="D#1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>E1</td>
                                <td id="E1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F1</td>
                                <td id="F1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F#1</td>
                                <td id="F#1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G1</td>
                                <td id="G1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G#1</td>
                                <td id="G#1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A1</td>
                                <td id="A1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A#1</td>
                                <td id="A#1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>B1</td>
                                <td id="B1-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            {/* Octava 2 */}
                            <tr className="octave-two">
                                <td>C2</td>
                                <td id="C2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>C#2</td>
                                <td id="C#2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D2</td>
                                <td id="D2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D#2</td>
                                <td id="D#2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>E2</td>
                                <td id="E2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F2</td>
                                <td id="F2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F#2</td>
                                <td id="F#2-00" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G#2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A#2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>B2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* Octava 3 */}
                            <tr className="octave-three">
                                <td>C3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>C#3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D#3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F#3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G#3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A#3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>B3</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* Octava 4 */}
                            <tr className="octave-four">
                                <td>C4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>C#4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D#4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F#4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G#4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A#4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>B4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* Octava 5 */}
                            <tr className="octave-five">
                                <td>C5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>C#5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D#5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F#5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G#5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A#5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>B5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* Octava 6 */}
                            <tr className="octave-six">
                                <td>C6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>C#6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>D#6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>F#6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>G#6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>A#6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>B6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>






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
                <p>Release {this.state.release * 10}</p>
                <input name="release" className="release-slider" type="range" min="0" max="1" step="0.01" value={this.state.release}
                    onChange={this.onChange} />
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(32.70)}>C1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(34.65)}>C#1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(36.71)}>D1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(38.89)}>D#1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(41.20)}>E1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(43.65)}>F1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(46.25)}>F#1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(49.00)}>G1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(51.91)}>G#1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(55.00)}>A1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(58.27)}>A#1</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(61.74)}>B1</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(65.41)}>C2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(69.30)}>C#2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(73.42)}>D2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(77.78)}>D#2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(82.41)}>E2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(87.31)}>F2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(92.50)}>F#2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(98.00)}>G2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(103.83)}>G#2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(110.00)}>A2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(116.54)}>A#2</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(123.47)}>B2</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(130.81)}>C3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(138.59)}>C#3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(146.83)}>D3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(155.56)}>D#3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(164.81)}>E3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(174.61)}>F3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(185.00)}>F#3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(196.00)}>G3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(207.65)}>G#3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(220.00)}>A3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(233.08)}>A#3</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(246.94)}>B3</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(261.63)}>C4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(277.18)}>C#4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(293.66)}>D4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(311.13)}>D#4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(329.63)}>E4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(349.23)}>F4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(369.99)}>F#4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(392.00)}>G4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(415.30)}>G#4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(440.00)}>A4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(466.16)}>A#4</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(493.88)}>B4</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(523.25)}>C5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(554.37)}>C#5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(587.33)}>D5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(622.25)}>D#5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(659.25)}>E5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(698.46)}>F5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(739.99)}>F#5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(783.99)}>G5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(830.61)}>G#5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(880.00)}>A5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(932.33)}>A#5</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(987.77)}>B5</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(1046.50)}>C6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1108.73)}>C#6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1174.66)}>D6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1244.51)}>D#6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1318.51)}>E6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1396.91)}>F6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1479.98)}>F#6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1567.98)}>G6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1661.22)}>G#6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1760.00)}>A6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1864.66)}>A#6</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(1975.53)}>B6</Button>
                <hr />
                <Button variant="light" type="submit" onClick={() => this.startOsc(2093.00)}>C7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2217.46)}>C#7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2349.32)}>D7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2489.02)}>D#7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2637.02)}>E7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2793.83)}>F7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(2959.96)}>F#7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(3135.96)}>G7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(3520.00)}>G#7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(3520.00)}>A7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(3729.31)}>A#7</Button>
                <Button variant="light" type="submit" onClick={() => this.startOsc(3951.07)}>B7</Button>
                <hr />
            </>
        )
    }
}

export default Synth