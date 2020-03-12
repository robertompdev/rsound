import React, { Component } from 'react'

/* --- Components import --- */
import Key from './Keys'

class Octave extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfOctaves: [5, 4, 3, 2]
        }
    }

    render() {
        return (
            <>
                {this.state.numberOfOctaves.map((octave, idx) => <Key {...this.props} octave={octave} key={idx} />)}
            </>
        )
    }

}

export default Octave