import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'

import octavesJson from '../../data/notes.json'


import MatrixSteps from './MatrixStepsCreation'

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
            sequence: [],
            octaves: octavesJson,
            matrix: []
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
                <p>Pattern Sequencer</p>
                <Button variant="light" type="submit" onClick={() => this.playSeq()} >Play Pattern</Button>
                <div className="div-seq">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
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

                            <MatrixSteps matrixCellOnClick={this.matrixCellOnClick} />

                            {/* Octava 1 */}


                            {/* <tr>
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
                                <td id="B1-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B1-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            {/* Octava 2 
                            <tr className="octave-two">
                                <td>C2</td>
                                <td id="C2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>C#2</td>
                                <td id="C#2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D2</td>
                                <td id="D2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D#2</td>
                                <td id="D#2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>E2</td>
                                <td id="E2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F2</td>
                                <td id="F2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F#2</td>
                                <td id="F#2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#2-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G2</td>
                                <td id="G2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G#2</td>
                                <td id="G#2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A2</td>
                                <td id="A2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A#2</td>
                                <td id="A#2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>B2</td>
                                <td id="B2-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B2-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            {/* Octava 3 
                            <tr className="octave-three">
                                <td>C3</td>
                                <td id="C3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>C#3</td>
                                <td id="C#3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D3</td>
                                <td id="D3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>D#3</td>
                                <td id="D#3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="D#3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>E3</td>
                                <td id="E3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="E3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F3</td>
                                <td id="F3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>F#3</td>
                                <td id="F#3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="F#3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G3</td>
                                <td id="G3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>G#3</td>
                                <td id="G#3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="G#3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A3</td>
                                <td id="A3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>A#3</td>
                                <td id="A#3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="A#3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>B3</td>
                                <td id="B3-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="B3-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            {/* Octava 4 
                            <tr className="octave-four">
                                <td>C4</td>
                                <td id="C4-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-01" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-02" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-03" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-04" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-05" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-06" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-07" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-08" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-09" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-10" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-11" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-12" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-13" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-14" className="" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C4-15" className="" onClick={() => this.matrixCellOnClick()}></td>
                            </tr>
                            <tr>
                                <td>C#4</td>
                                <td id="C#4-00" className="00" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-01" className="01" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-02" className="02" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-03" className="03" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-04" className="04" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-05" className="05" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-06" className="06" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-07" className="07" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-08" className="08" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-09" className="09" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-10" className="10" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-11" className="11" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-12" className="12" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-13" className="13" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-14" className="14" onClick={() => this.matrixCellOnClick()}></td>
                                <td id="C#4-15" className="15" onClick={() => this.matrixCellOnClick()}></td>
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
                            {/* Octava 5 
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
                            {/* Octava 6 
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
                            </tr> */}
                        </tbody>
                    </Table>
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
                <p>Release {this.state.release * 10}</p>
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