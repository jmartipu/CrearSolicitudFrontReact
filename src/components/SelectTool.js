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
                <div className="col-md-3">
                    <div className="col-md-1">
                        <label className="col-form-label text-info">Herramienta: </label>
                    </div>

                    <div className="col-md-1">
                        <select className="select2-close-mask text-black-50">
                            {items}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectTool