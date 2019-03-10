import React from 'react';
import axios from 'axios';
import EmployeeListItem from './employee/employee_list_item';
import './searchbar.css';


class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchQuery: '',
      employees: []
    }
    this.findMatches = this.findMatches.bind(this)
    this.displayMatches = this.displayMatches.bind(this)
  }

  componentDidMount(){
    axios.get('/api/employees', {params: {fname: 'r'}})
    .then( res => res.data )
    .then(employees => this.setState({employees}))    
  }

  findMatches(wordToMatch) {

    return this.state.employees.filter( employee => {
      const regex = new RegExp(wordToMatch, 'gi');
      return employee.fname.match(regex) || employee.lname.match(regex) || employee.e_id === Number(wordToMatch);
    })
  }

  displayMatches (){
    if (!this.state.searchQuery){
      return(
        <div>
        </div>
      )
    }
    const matchArray = this.findMatches(this.state.searchQuery);
    const html = matchArray.map( employee => {
      return(
        <li key={employee.e_id}>
          <EmployeeListItem employee={employee} />
        </li>
      )
    })
    return html
  };

  // setSearchQuery = debounce(e => {
  //   this.setState({
  //     searchQuery: e.target.value
  //   })
  // }, 400)

  handleUpdate (field){
    return e => this.setState({
      [field]: e.currentTarget.value
    })
  }



  render(){
    const matches = this.displayMatches()
    return(
      <div className="search-form">
        <form>
          <input id="searchbar" type="text" placeholder="Search Employee Directory..." onChange={this.handleUpdate('searchQuery')} value={this.state.searchQuery}/>
        </form>
        <ul>
          {matches}
        </ul>
      </div>
    )
  }
}

export default SearchBar;