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
            numberOfSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        }
    }

    render() {
        return (
            <>
                <Row className="no-gutters">
                    {this.state.numberOfSteps.map((step, idx) => <div className="step-header" key={idx}>{step}</div>)}
                </Row>
                <Row className="div-seq no-gutters">
                    {this.state.numberOfSteps.map((step, idx) => <Col className="step-col" key={idx}><Octave {...this.props} step={step} /></Col>)}
                </Row>
            </>)
    }
}

export default MSC