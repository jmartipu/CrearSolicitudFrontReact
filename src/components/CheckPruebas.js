import React, {Component} from 'react'

class CheckPruebas extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            pruebas: [],
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/pruebas/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                pruebas: data,
                loading: false,
            })
        })
    }

    render() {
        var items = []
        if (this.state.pruebas.length > 0) {
            items = this.state.pruebas.map(item => {
                return(
                    <div key={"checkpruebasj" + item.id}className="form-check">
                        <input className="form-check-input" type="checkbox" id={"checkpruebas" + item.id}
                               value={item.id} />
                            <label className="form-check-label" htmlFor={"checkpruebas" + item.id}>
                                {item.nombre}
                            </label>
                    </div>
                    )
            })
        }


        return (
            <div>
                <div className="col-md-3">
                    <div className="col-md-1">
                        <label className="col-form-label text-info">Pruebas: </label>
                    </div>
                    <div className="col-md-1">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckPruebas