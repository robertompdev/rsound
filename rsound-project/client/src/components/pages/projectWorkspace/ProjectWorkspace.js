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
                <Button variant="dark" type="submit" onClick={() => startOsc(21.83)}>F0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(24.50)}>G0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(25.96)}>G#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(27.50)}>A0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(29.14)}>A#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(30.87)}>B0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(32.70)}>C1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(34.65)}>C#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(36.71)}>D1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(38.89)}>D#1</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>
                <Button variant="dark" type="submit" onClick={() => startOsc(23.12)}>F#0</Button>


                <Button variant="dark" type="submit" onClick={() => stopOsc()} >Stop</Button>
            </>
        )
    }

}

export default Project