
import { useState } from 'react';

function EmployeeForm() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const employee = {
      name,
      designation,
      location,
      salary: Number(salary)
    };
    console.log("Form data:", employee);

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save employee');
      }

      alert('Employee saved successfully!');

      setName('');
      setDesignation('');
      setLocation('');
      setSalary('');
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Could not save employee. Check that the backend is running.');
    }
  }

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Employee Form</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          className="form-control mb-3"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="form-label">Designation</label>
        <input
          className="form-control mb-3"
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        <label className="form-label">Location</label>
        <input
          className="form-control mb-3"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label className="form-label">Salary</label>
        <input
          className="form-control mb-3"
          type="number"
          min="0"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
