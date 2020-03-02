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
                <Button variant="dark" type="submit" onClick={startOsc()} frequency="140">Play</Button>
                <Button variant="dark" type="submit" onClick={stopOsc()} >Stop</Button>
            </>
        )
    }

}

export default Project