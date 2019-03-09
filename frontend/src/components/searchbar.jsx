import React from 'react';
import {debounce} from 'lodash';
import EmployeeList from './employee/employee_list';

class SearchBar extends React.Component{
  constructor(){
    super()
    this.state = {
      searchQuery: ''
    }
  }

  setSearchQuery = debounce(e => {
    this.setState({
      searchQuery: e.target.value
    })
  }, 400)

  displayMatches


  render(){
    return(
      <div className="search-form">
        <form>
          <input id="searchbar" type="text" placeholder="Search Employee Directory..." onChange={this.setSearchQuery}/>
        </form>
        <EmployeeList searchQuery={this.state.searchQuery}/>
      </div>
    )
  }
}

export default SearchBar;