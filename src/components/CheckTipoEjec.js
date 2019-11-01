import React, {Component} from 'react'

class CheckTipoEjec extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            tipo_ejecucion: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/tipoejecucion/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                tipo_ejecucion: data,
                loading: false,
            })
        })
    }

    render() {
        var items = []
        if (this.state.tipo_ejecucion.length > 0) {
            items = this.state.tipo_ejecucion.map(item => {
                return(
                    <div key={"checktipoej" + item.id}className="form-check">
                        <input className="form-check-input" type="checkbox" id={"tiposEjec" + item.id}
                               value={item.id} />
                            <label className="form-check-label" htmlFor={"tiposEjec" + item.id}>
                                {item.tipo_ejecucion}
                            </label>
                    </div>
                    )
            })
        }


        return (
            <div>
                <div className="col-md-3">
                    <div className="col-md-1">
                        <label className="col-form-label text-info">Tipo de Ejecución: </label>
                    </div>
                    <div className="col-md-1">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckTipoEjec