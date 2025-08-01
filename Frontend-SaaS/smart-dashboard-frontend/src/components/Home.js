import React, { useEffect, useState, useRef } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import EmployeeChart from './EmployeeChart';
import { toast } from 'react-toastify';
import AIChat from './AIChat';


function Home() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const formRef = useRef(null); // 👈 for scrolling to form

  const fetchEmployees = async () => {
    const res = await fetch('http://localhost:8080/api/employees');
    const data = await res.json();
    setEmployees(data);
  };

  const fetchStats = async () => {
    const res = await fetch('http://localhost:8080/api/stats');
    const data = await res.json();
    setStats(data);
  };

  const handleAdd = () => {
    fetchEmployees();
    fetchStats();
    setEditingEmployee(null);
    toast.success("Employee added successfully!");
  };

  const handleUpdate = () => {
    fetchEmployees();
    fetchStats();
    setEditingEmployee(null);
    toast.success("Employee updated successfully!");
  };

  const handleDelete = () => {
    fetchEmployees();
    fetchStats();
  };

  const handleSearch = async (query) => {
    const res = await fetch(`http://localhost:8080/api/employees/search?query=${query}`);
    const data = await res.json();
    setEmployees(data);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, []);

  return (
    <>
      

      <div className="container mt-4">
        <div className="row mb-4" ref={formRef}>
          <div className="col-md-6">
            <EmployeeForm
              onAdd={handleAdd}
              editingEmployee={editingEmployee}
              onUpdate={handleUpdate}
            />
          </div>
          <div className="col-md-6">
            <EmployeeChart data={stats} />
          </div>
        </div>

        <EmployeeList
          employees={employees}
          onDelete={handleDelete}
          onSearch={handleSearch}
          onEdit={handleEdit}
        />

        <div className="mt-5 p-4 border rounded shadow-sm">
          <AIChat />
        </div>
      </div>
    </>
  );
}

export default Home;
