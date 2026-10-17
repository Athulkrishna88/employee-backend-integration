
function EmployeeForm() {
  function handleSubmit(event) {
    event.preventDefault();
    alert('Employee form submitted successfully!');
  }

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Employee Form</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input className="form-control mb-3" type="text" required />

        <label className="form-label">Designation</label>
        <input className="form-control mb-3" type="text" required />

        <label className="form-label">Location</label>
        <input className="form-control mb-3" type="text" required />

        <label className="form-label">Salary</label>
        <input className="form-control mb-3" type="number" min="0" required />

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
