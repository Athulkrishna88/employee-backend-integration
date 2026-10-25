import { useEffect, useState } from 'react';

function Home() {
  const [employees, setEmployees] = useState([]);

  // Get all employees from the database
  async function fetchEmployees() {
    try {
      const response = await fetch('http://localhost:5000/api/employees');

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Edit employee
  async function handleEdit(employee) {
    const name = prompt('Enter employee name:', employee.name);
    if (name === null) return;

    const designation = prompt(
      'Enter designation:',
      employee.designation || ''
    );
    if (designation === null) return;

    const location = prompt('Enter location:', employee.location || '');
    if (location === null) return;

    const salary = prompt('Enter salary:', employee.salary);
    if (salary === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employee._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            designation,
            location,
            salary: Number(salary)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      alert('Employee updated successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Could not update employee.');
    }
  }

  // Delete employee
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Could not delete employee.');
    }
  }

  return (
    <div className="container mt-4">
      <h2>Employee Dashboard</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.location}</td>
              <td>{employee.salary}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
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

export default Home;