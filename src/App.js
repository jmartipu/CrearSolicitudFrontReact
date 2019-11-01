import React, { Component } from 'react'
import {Container, Row, Col, Table, Button} from 'reactstrap'
import ModalForm from './components/Modals/Modal'
import DataTable from './components/Tables/DataTable'
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import Nav from "./components/Nav"
import Solicitudes from "./components/Solicitudes"
import SelectAplicacion from "./components/SelectAplicacion"
import SelectTool from "./components/SelectTool"
import CheckPrueba from "./components/CheckPrueba"
import CheckTipoEjec from "./components/CheckTipoEjec"
import DataTableSolicitudes from "./components/DataTableSolicitudes"


class App extends Component {
    error_msg = "";
    tipo_prueba_list;

    addTipoPruebaToState = (item) => {
        this.setState(prevState => ({
          tipos_pruebas: [...prevState.tipos_pruebas, item]
        }))
    };

    updateTipoPrueba = (item) => {
        const itemIndex = this.state.tipos_pruebas.findIndex(data => data.id === item.id)
        const newArray = [
        // destructure all tipos_pruebas from beginning to the indexed item
          ...this.state.tipos_pruebas.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the tipos_pruebas to the array from the index after the replaced item
          ...this.state.tipos_pruebas.slice(itemIndex + 1)
        ];
        this.setState({ tipos_pruebas: newArray })
    };

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?');
        if(confirmDelete){
          fetch('http://127.0.0.1:8000/api/v1/tipopruebas/'+id+'/', {
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

    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            tipos_pruebas: []
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
              this.setState({ username: json.username });
            });
            fetch('http://127.0.0.1:8000/api/v1/tipopruebas/'
                , {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({tipos_pruebas: json});
                console.log(JSON.stringify(json));
                this.tipo_prueba_list = this.state.tipos_pruebas.map(item => {
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
                    })
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        let form;

        switch (this.state.displayed_form) {
          case 'login':
            form = <LoginForm handle_login={this.handle_login} />;
            break;
          case 'signup':
            form = <SignupForm handle_signup={this.handle_signup} />;


            break;
          default:
            form = null;
        }

        return (
          <div className="App">
              <nav className="navbar navbar-light bg-light">
                  <span className="navbar-brand mb-0 h1">Test App</span>
                  <Nav
                      logged_in={this.state.logged_in}
                      display_form={this.display_form}
                      handle_logout={this.handle_logout}
                    />
              </nav>
              <div>{this.error_msg}</div>
            {/*<h5>*/}
            {/*  {this.state.logged_in*/}
            {/*    ? `Hello, ${this.state.username}`*/}
            {/*    : ''}*/}
            {/*</h5>*/}
              {form}
            {/*<div>*/}
            {/*    {this.state.logged_in*/}
            {/*    ?*/}

            {/*        <div>*/}
            {/*            <Table responsive hover>*/}
            {/*                <thead>*/}
            {/*                <tr>*/}
            {/*                    <th>ID</th>*/}
            {/*                    <th>TipoPrueba</th>*/}
            {/*                </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                {this.tipo_prueba_list}*/}
            {/*                </tbody>*/}
            {/*            </Table>*/}
            {/*                /!*<DataTable items={this.state.tipos_pruebas} updateState={this.updateTipoPrueba} deleteItemFromState={this.deleteITipoPruebaFromState} />*!/*/}

            {/*                <ModalForm buttonLabel="Add Item" addItemToState={this.addTipoPruebaToState}/>*/}

            {/*        </div>*/}
            {/*    : ''}*/}

            {/*</div>*/}
              <div>
                  <SelectAplicacion/>
              </div>
              <div>
                  <SelectTool/>
              </div>
              <div>
                  <CheckPrueba/>
              </div>
              <div>
                  <CheckTipoEjec/>
              </div>
              <div>
                  <DataTableSolicitudes/>
              </div>
          </div>
        );
    }



    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api-token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
              this.error_msg = "";
              if(json.token){
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username
                });
              }
              else {
                this.setState({
                    logged_in: false,
                    displayed_form: '',
                    username: ''
                });
                this.error_msg =  'usuario o contraseña invalidos'
              }
          });
      };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000//api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
}

export default App;
