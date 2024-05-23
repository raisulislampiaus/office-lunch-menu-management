import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeNavbar = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/employee/view-menu">View Menu</Link></li>
      <li><Link to="/employee/select-choice/:userId">Choice</Link></li>
      
    </ul>
  </nav>
);

export default EmployeeNavbar;
