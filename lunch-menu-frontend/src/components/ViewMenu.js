import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ViewMenu = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMenuOptions = async () => {
      try {
        const response = await axios.get('/api/menus/today', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) {
          setMenuOptions(response.data.menuOptions);
          console.log(response.data.menuOptions)
        }
      } catch (error) {
        alert('Error fetching menu options');
      }
    };

    fetchMenuOptions();
  }, []);

  if (user) {
    return (
      <div className="ViewMenu">
        <h2>Today's Menu</h2>
        <ul>
          {menuOptions.map((option) => (
            <li key={option.id}>{option.option_name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>You do not have access to this page</div>;
  }
};

export default ViewMenu;
