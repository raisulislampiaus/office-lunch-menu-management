import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/admin/add-menu">Add Menu</Link></li>
      <li><Link to="/admin/add-menu-option">Add Menu Option</Link></li>
      <li><Link to="/admin/view-choices">View Choices</Link></li>
      
    </ul>
  </nav>
);

export default AdminNavbar;
