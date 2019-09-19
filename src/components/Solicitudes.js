import React from 'react';
import axios from "axios";

class Solicitudes extends React.Component {
    state = {
        solicitudes: []
    };
    componentDidMount() {
        this.getSolicitudes();
    }
    getSolicitudes() {
        axios.get('http://127.0.0.1:8000/api/v1/solicitudes/')
            .then(res => {
                this.setState({solicitudes: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

  render() {
    return (
       <div>
            {this.state.solicitudes.map(
                item => (
                    <div key={item.id}>
                        <h2>{item.nombre}</h2>
                        <div><p>{item.creado_por}</p><p>{item.fecha_creacion}</p></div>
                        <p>{item.descripcion}</p>
                        <p>{item.script}</p>
                    </div>
                )
            )}
        </div>
    );
  }
}

export default Solicitudes;
