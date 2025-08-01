import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function EmployeeList({ employees, onDelete, onSearch, onEdit }) {
  const [search, setSearch] = useState('');

  // 🔍 Live search (streaming letter-by-letter)
  useEffect(() => {
    onSearch(search);
  }, [search]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success("Employee deleted!");
      onDelete();
    } else {
      toast.error("Failed to delete employee.");
    }
  };

  if (!employees.length) return <p>No employees yet.</p>;

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Employee List</h4>

      {/* 🔍 Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, department, or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={() => onSearch(search)}>
          Search
        </button>
      </div>

      {/* 👥 Employee Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(emp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
