import React, { Component } from 'react'

/* --- Components import --- */
import Key from './Keys'

class Octave extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfOctaves: [7, 6, 5, 4, 3, 2, 1],
            numberOfSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        }
    }

    render() {
        return (
            <>
                {this.state.numberOfOctaves.map((octave, idx) => <Key octave={octave} step={this.props.step} key={idx} />)}
            </>
        )

    }

}

export default Octave