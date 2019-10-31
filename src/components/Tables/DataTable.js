import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?');
    if(confirmDelete){
      fetch('http://127.0.0.1:8000/api/v1/tipopruebas/', {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteITipoPruebaFromState(id)
      })
      .catch(err => console.log(err))
    }

  };

  render() {
    const tipo_prueba = this.props.tipos_pruebas.map(item => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.tipo_prueba}</td>
                <td>
                    <div style={{width: "110px"}}>
                        <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateTipoPrueba}/>
                        {' '}
                        <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                    </div>
                </td>
            </tr>
        )
    });


    return (
        <Table responsive hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>TipoPrueba</th>
            </tr>
            </thead>
            <tbody>
            {tipo_prueba}
            </tbody>
        </Table>
    )
  }
}

export default DataTable