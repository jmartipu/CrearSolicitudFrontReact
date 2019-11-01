import React, {Component} from 'react'
import OptionAplicacion from './OptionAplicacion'

class SelectAplicacion extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            applications: [],
            serverError: "" ,
        }
    }

    getData() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:8000/api/v1/aplicacion/'
            , {

                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log("consulta exitosa " + data.count + " registros")
                this.setState({
                    applications: data,
                    loading: false,
                })
            })
            .catch(ex => {
                this.setState(
                    {
                        serverError: ex
                    })
            })
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        var items = []

        if (this.state.applications.length > 0){
            items = this.state.applications.map(item => {
                return(
                        <OptionAplicacion key={item.id} id={item.id} name={item.nombre + ' - ' + item.version}/>
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

export default SelectAplicacion