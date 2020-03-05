import React, { Component } from 'react'

import './Synth.css'

class Key extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]
        }
    }

    render() {
        return (
            <>
                {this.state.notes.map((note, idx) => <div className={`key-note ${note}`} key={idx} octave={this.props.octave} note={note}>{note}{this.props.octave} S:{this.props.step}</div>)}
            </>
        )
    }
}

export default Key