import React from 'react';

class EmployeeListItem extends React.Component {
  shouldComponentUpdate(nextProps){
    if (this.props === nextProps){
      return false;
    }
    return true;
  }

  render(){
    const {employee} = this.props;
    return(
      <div className="EmployeeListItem">
        <h1>{employee.fname} {employee.lname} - {employee.e_id}</h1>
      </div>
    )

  }
}

export default EmployeeListItem;