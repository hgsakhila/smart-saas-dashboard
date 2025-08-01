  import React, { useState, useEffect } from 'react';

  function EmployeeForm({ onAdd, editingEmployee, onUpdate }) {
    const [employee, setEmployee] = useState({ name: '', department: '', role: '' });

    useEffect(() => {
      if (editingEmployee) {
        setEmployee(editingEmployee);
      } else {
        setEmployee({ name: '', department: '', role: '' });
      }
    }, [editingEmployee]);

    const handleChange = (e) => {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const url = editingEmployee
        ? `http://localhost:8080/api/employees/${editingEmployee.id}`
        : 'http://localhost:8080/api/employees';

      const method = editingEmployee ? 'PUT' : 'POST';

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // ✅ Required for session-based auth
          body: JSON.stringify(employee),
        });

        if (res.ok) {
          setEmployee({ name: '', department: '', role: '' });
          editingEmployee ? onUpdate() : onAdd();
        } else {
          const errorText = await res.text();
          console.error('Server error:', errorText);
          alert('Failed to save employee. Check console for details.');
        }
      } catch (err) {
        console.error('Network error:', err);
        alert('Failed to connect to the server.');
      }
    };

    const handleCancel = () => {
      setEmployee({ name: '', department: '', role: '' });
      onUpdate(); // resets edit mode from parent
    };

    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <h4>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h4>
        <input
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control mb-2"
          required
        />
        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          className="form-control mb-2"
          required
        />
        <input
          name="role"
          value={employee.role}
          onChange={handleChange}
          placeholder="Role"
          className="form-control mb-2"
          required
        />
        <div className="d-flex gap-2">
          <button className="btn btn-primary w-100" type="submit">
            {editingEmployee ? 'Update' : 'Add'}
          </button>
          {editingEmployee && (
            <button className="btn btn-secondary w-100" type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }

  export default EmployeeForm;
