import React from 'react'

function OptionTool(props) {
    return(
        <option id={props.id}>
            {props.name}
        </option>
    )
}
export default OptionTool