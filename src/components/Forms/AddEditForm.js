import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    tipo_prueba: '',
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/api/v1/tipopruebas/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipo_prueba: this.state.tipo_prueba
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addTipoPruebaToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/v1/tipopruebas/' + this.state.id + '/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        tipo_prueba: this.state.tipo_prueba
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateTipoPrueba(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  };

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, tipo_prueba } = this.props.item;
      this.setState({ id, tipo_prueba })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="tipo_prueba">Tipo Prueba</Label>
          <Input type="text" name="tipo_prueba" id="tipo_prueba" onChange={this.onChange}
                 value={this.state.tipo_prueba === null ? '' : this.state.tipo_prueba} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm