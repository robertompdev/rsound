import React, { Component } from 'react'

import '../DrumMachine.css'

class Key extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: ["RT", "HH", "SN", "BD"]
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