// src/components/EmployeeTable.js
import React from 'react';

function EmployeeTable({ employees }) {
  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={emp.id}>
            <td>{index + 1}</td>
            <td>{emp.name}</td>
            <td>{emp.role}</td>
            <td>{emp.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
