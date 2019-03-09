import React from 'react';
import {debounce} from 'lodash';

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

  


  render(){
    return(
      <div className="search-form">
        <form>
          <input type="text" placeholder="Search Employee Directory..." onChange={this.setSearchQuery}/>
        </form>
      </div>
    )
  }
}

export default SearchBar;