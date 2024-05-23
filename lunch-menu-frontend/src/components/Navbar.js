import React from 'react';
import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login'); // Redirect to login page after logout
  };

  return (
    <nav>
      <ul>
        
        {user ? (
          <>
            {user.role === 'admin' ? <AdminNavbar /> : <EmployeeNavbar />}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
