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
    axios.get('/api/employees')
    .then( res => console.log(res.json()) )
    
  }


  render(){
    return(
      <div className="employees-list">

      </div>
    )
  }
}

export default EmployeeList;