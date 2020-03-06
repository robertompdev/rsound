import React, { Component } from 'react'

import './DrumMachine.css'

class Key extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: ["B2", "A#1", "A1", "G#1", "G1", "F#1", "F1", "E1", "D#1", "D2", "C#2", "C4"]
        }
    }

    render() {
        return (
            <>
                {this.state.notes.map((note, idx) => <div id={`${note}0${this.props.step}`} className={`drum-note ${this.props.step}`} key={idx} note={note} step={this.props.step} onClick={this.props.matrixCellOnClick}></div>)}
            </>
        )
    }
}

export default Key