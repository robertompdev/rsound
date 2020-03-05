import React from 'react'
import TableRow from './TableRow'

class Col extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            numberOfOctaves: [1, 2, 3, 4, 5, 6, 7],
            notes: ["C", "C#", "D", "D#", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        }
    }


    render() {
        return (
            this.state.notes.map((elm, idx) =>

                <TableRow
                    key={idx}
                    step={this.state.numberOfSteps[0]}
                    note={elm}
                    octave={this.state.numberOfOctaves[0]}
                    matrixCellOnClick={this.props.matrixCellOnClick}
                />

            )
        )
    }
}

export default Col