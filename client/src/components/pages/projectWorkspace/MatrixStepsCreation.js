import React, { Component } from 'react'

/* --- Styling import --- */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

/* --- Components import --- */
import Octave from './Ocatves'

class MSC extends Component {

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
                <Row className="div-seq no-gutters">
                    {this.state.numberOfSteps.map((step, idx) => <Col className="step-col" key={idx}><Octave step={step} /></Col>)}
                </Row>
            </>)
    }
}

export default MSC