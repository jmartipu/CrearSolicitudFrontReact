import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

class DataTableSolicitudes extends Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            solicitudes: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/solicitudes/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    solicitudes: data,
                    loading: false,
                })
            })
    }

    // deleteISolicitudesFromState = (id) => {
    //     const updatedItems = this.state.solicitudes.filter(item => item.id !== id)
    //     this.setState({ solicitudes: updatedItems })
    // }

    // deleteItem = id => {
    //     let confirmDelete = window.confirm('Delete item forever?');
    //     if (confirmDelete) {
    //         fetch('http://localhost:8000/api/v1/solicitudes/', {
    //             method: 'delete',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 id
    //             })
    //         })
    //             .then(response => response.json())
    //             .then(item => {
    //                 this.props.deleteISolicitudesFromState(id)
    //             })
    //             .catch(err => console.log(err))
    //     }
    //
    // }

    render() {
        var solicitudes = []
        console.log(this.state.solicitudes);
        if (this.state.solicitudes.length > 0) {
            solicitudes = this.state.solicitudes.map(item => {
                const application = item.aplicacion.map(item => {return <div key={"app" + item.id}>{item.nombre}-{item.version} <br/></div>})
                const herramienta = item.herramienta.map(item => {return <div key={"tool" + item.id}>{item.nombre}-{item.alto_pantalla}x{item.ancho_pantalla} <br/></div>})
                const tipoPtueba = item.tipo_prueba.map(item => {return <div key={"tipop" + item.id}>{item.tipo_prueba} <br/></div>})
                const tipoEjec = item.tipo_ejecucion.map(item => {return <div key={"tipop" + item.id}>{item.tipo_ejecucion} <br/></div>})
                const pruebas = item.pruebas.map(item => {return <div key={"tipop" + item.id}><div>{item.nombre}</div><div>{item.descripcion}</div><br/> </div>})

                return (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.nombre}</td>
                        <td>{application}</td>
                        <td>{herramienta}</td>
                        <td>{tipoPtueba}</td>
                        <td>{tipoEjec}</td>
                        <td>{pruebas}</td>
                        <td>{item.descripcion}</td>

                    </tr>
                )
            })
        }

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>APPLICACION</th>
                    <th>HERRAMIENTA</th>
                    <th>TIPO P</th>
                    <th>TIPO EJ</th>
                    <th>PRUEBAS</th>
                    <th>DESCRIPCION</th>

                </tr>
                </thead>
                <tbody>
                {solicitudes}
                </tbody>
            </Table>
        )
    }
}

export default DataTableSolicitudes