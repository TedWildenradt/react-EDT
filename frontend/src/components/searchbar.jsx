import React from 'react';

class SearchBar extends React.Component{
  constructor(){
    super()
    this.state = {
      searchQuery: ''
    }
  }

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