import React from 'react';
import axios from 'axios';
import EmployeeListItem from './employee/employee_list_item';
import './searchbar.css';
import _ from 'lodash';


class SearchBar2 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchQuery: '',
      employees: []
    }
    this.delayedCallback = _.debounce(this.ajaxCall, 1000);
    this.displayMatches = this.displayMatches.bind(this)
  }

  ajaxCall(letters){
    const {searchQuery} = this.state
    axios.get('/api/employees', {params: {input: searchQuery}})
    .then( res => res.data )
    .then(employees => {
      console.log(employees)
      this.setState({employees, searchQuery: `${letters}`})
    })
  }

  onChange(event) {
    const letters = event.currentTarget.value
    this.setState({
      searchQuery: event.currentTarget.value
    })
    this.delayedCallback(letters);
  }

  displayMatches (){
    if (!this.state.searchQuery){
      return(
        <div>
        </div>
      )
    }
    const html = this.state.employees.map( employee => {
      return(
        <li key={employee.e_id}>
          <EmployeeListItem employee={employee} />
        </li>
      )
    })
    return html
  };

  render(){
    const matches = this.displayMatches()
    return(
      <div className="search-form">
        <form>
          <input id="searchbar" className="search-box" type="text" placeholder="Search Employee Directory..." onChange={this.onChange.bind(this)} value={this.state.searchQuery}/>
        </form>
        <ul>
          {matches}
        </ul>
      </div>
    )
  }
}

export default SearchBar2;