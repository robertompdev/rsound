import React from 'react'

const Row = props => {
    const idComposition = `${props.note}${props.octave}-0${props.step}`;

    return (
        <tr>
            <td id={idComposition} onClick={props.matrixCellOnClick}>
            </td>
        </tr>
    )
}

export default Row