import React, { Component } from 'react'

class Key extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        }
    }

    render() {
        return (
            <>
                {this.state.notes.map(note => <div octave={this.props.octave}>{note}</div>)}
            </>
        )

    }

}

export default Key