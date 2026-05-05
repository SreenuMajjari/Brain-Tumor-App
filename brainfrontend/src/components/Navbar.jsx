import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🧠</span> BrainCare
        </Link>
        <nav className="navbar-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/analysis" className={`nav-link ${isActive('/analysis')}`}>Analysis</Link>
          <Link to="/diseases" className={`nav-link ${isActive('/diseases')}`}>Diseases</Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
