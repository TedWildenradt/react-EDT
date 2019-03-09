import React from 'react';
import EmployeListItem from './employee_list_item';
import axios from 'axios';

class EmployeeList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      employees: []
    }
  }

  componentDidMount(){
    axios.get('/api/employees', {
      params: {
        fname: 'bob'
      }
    })
    .then( res => res.data )
    .then(employees => this.setState({employees}))
    
  }


  render(){
    return(
      <div className="employees-list">

      </div>
    )
  }
}

export default EmployeeList;