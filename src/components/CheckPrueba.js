import React, {Component} from 'react'

class CheckPrueba extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            tipos_prueba: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/tipopruebas/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                tipos_prueba: data,
                loading: false,
            })
        })
    }

    render() {
        var items = []
        if (this.state.tipos_prueba.length > 0) {
            items = this.state.tipos_prueba.map(item => {
                return(
                    <div key={"checkp" + item.id} className="form-check">
                        <input className="form-check-input" type="radio" name="tiposPruebaRadios" id={"tiposPruebaRadios" + item.id}
                               value={item.id} />
                            <label className="form-check-label" htmlFor={"tiposPruebaRadios" + item.id}>
                                {item.tipo_prueba}
                            </label>
                    </div>
                    )
            })
        }


        return (
            <div>
                <div className="col-md-3">
                    <div className="col-md-1">
                        <label className="col-form-label text-info">Tipo de Pruebas: </label>
                    </div>
                    <div className="col-md-1">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckPrueba