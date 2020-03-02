import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { startOsc } from './Synth'
import { stopOsc } from './Synth'

class Project extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(32.70)}>C1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(34.65)}>C#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(36.71)}>D1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(38.89)}>D#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(41.20)}>E1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(43.65)}>F1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(46.25)}>F#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(49.00)}>G1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(51.91)}>G#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(55.00)}>A1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(58.27)}>A#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(61.74)}>B1</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(65.41)}>C2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(69.30)}>C#2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(73.42)}>D2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(77.78)}>D#2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(82.41)}>E2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(87.31)}>F2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(92.50)}>F#2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(98.00)}>G2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(103.83)}>G#2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(110.00)}>A2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(116.54)}>A#2</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(123.47)}>B2</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(130.81)}>C3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(138.59)}>C#3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(146.83)}>D3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(155.56)}>D#3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(164.81)}>E3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(174.61)}>F3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(185.00)}>F#3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(196.00)}>G3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(207.65)}>G#3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(220.00)}>A3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(233.08)}>A#3</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(246.94)}>B3</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(261.63)}>C4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(277.18)}>C#4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(293.66)}>D4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(311.13)}>D#4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(329.63)}>E4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(349.23)}>F4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(369.99)}>F#4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(392.00)}>G4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(415.30)}>G#4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(440.00)}>A4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(466.16)}>A#4</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(493.88)}>B4</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(523.25)}>C5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(554.37)}>C#5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(587.33)}>D5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(622.25)}>D#5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(659.25)}>E5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(698.46)}>F5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(739.99)}>F#5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(783.99)}>G5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(830.61)}>G#5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(880.00)}>A5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(932.33)}>A#5</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(987.77)}>B5</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(1046.50)}>C6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1108.73)}>C#6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1174.66)}>D6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1244.51)}>D#6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1318.51)}>E6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1396.91)}>F6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1479.98)}>F#6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1567.98)}>G6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1661.22)}>G#6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1760.00)}>A6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1864.66)}>A#6</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(1975.53)}>B6</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => startOsc(2093.00)}>C7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2217.46)}>C#7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2349.32)}>D7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2489.02)}>D#7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2637.02)}>E7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2793.83)}>F7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(2959.96)}>F#7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(3135.96)}>G7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(3520.00)}>G#7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(3520.00)}>A7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(3729.31)}>A#7</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(3951.07)}>B7</Button>
                <hr />
                <Button variant="dark" type="submit" onClick={() => stopOsc()} >Stop</Button>
            </>
        )
    }

}

export default Project