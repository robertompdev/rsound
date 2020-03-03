import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

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
            sequence: [65.41, 65.41, 130.81, 130.81]
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

                <Button variant="light" type="submit" onClick={() => this.playSeq()}>Play Sequence</Button>


                <hr />
                <p>Attack {this.state.attack * 10}</p>
                <input name="attack" className="attack-slider" type="range" min="0" max="1" step="0.01" value={this.state.attack}
                    onChange={this.onChange} />
                <p>Decay {this.state.decay * 10}</p>
                <input name="decay" className="decay-slider" type="range" min="0" max="1" step="0.01" value={this.state.decay}
                    onChange={this.onChange} />
                <p>Sustain {this.state.sustain * 10}</p>
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