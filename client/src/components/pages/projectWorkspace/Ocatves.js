import React, { Component } from 'react'

/* --- Components import --- */
import Key from './Keys'

class Octave extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfOctaves: [7, 6, 5, 4, 3, 2, 1]
        }
    }

    render() {
        return (
            <>
                {this.state.numberOfOctaves.map(octave => <Key octave={octave} />)}
            </>
        )

    }

}

export default Octave