import React from 'react'

function OptionAplicacion(props) {
    return(
        <option id={props.id}>
            {props.name}
        </option>
    )
}
export default OptionAplicacion