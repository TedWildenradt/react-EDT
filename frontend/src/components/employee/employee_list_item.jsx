import React from 'react';

function EmployeeListItem({employee}) {
  return(
    <div className="EmployeeListItem">
      <h1>{employee.fname} {employee.lname} - {employee.e_id}</h1>
    </div>
  )
}

export default EmployeeListItem;