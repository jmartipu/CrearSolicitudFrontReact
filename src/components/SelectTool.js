import React, {Component} from 'react'
import OptionTool from './OptionTool'

class SelectTool extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            tools: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/herramienta/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                tools: data,
                loading: false,
            })
        })
    }

    render() {
        var items = []
        if (this.state.tools.length > 0) {
            items = this.state.tools.map(item => {
                return(
                        <OptionTool key={item.id} id={item.id}
                                    name={
                                        item.nombre + ' | ' +
                                        item.alto_pantalla + ' | ' +
                                        item.ancho_pantalla
                                    }
                        />
                    )
            })
        }


        return (
            <div>
                <select>
                    {items}
                </select>
            </div>
        );
    }
}

export default SelectTool