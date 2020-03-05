import React, { Component } from 'react'

/* --- Styling import --- */
import TableRow from './TableRow'
import TableCol from './TableColumn'

class MSC extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numberOfOctaves: [1, 2, 3, 4, 5, 6, 7],
        }
    }

    render() {
        return (
            this.state.numberOfOctaves.map((elm, idx) =>
                <TableCol />
            ))
    }
}

export default MSC