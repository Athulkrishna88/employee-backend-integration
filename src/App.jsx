import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary px-4">
        <Link className="navbar-brand" to="/">
          Employee Dashboard
        </Link>

        <div className="d-flex gap-3">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>

          <Link className="nav-link text-white" to="/employee">
            Employee Form
          </Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<EmployeeForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
