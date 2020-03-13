import React, { Component } from 'react'

import '../Synth.css'

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
                {this.state.notes.map((note, idx) => <div id={`${note}${this.props.octave}0${this.props.step}`} className={`key-note ${this.props.step}`} key={idx} octave={this.props.octave} note={note} step={this.props.step} onClick={this.props.matrixCellOnClick}>{note}{this.props.step}</div>)}
            </>
        )
    }
}

export default Key