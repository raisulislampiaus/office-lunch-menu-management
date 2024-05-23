import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SelectChoice = () => {
  const [menuOptionId, setMenuOptionId] = useState('');
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
        }
      } catch (error) {
        console.error('Error fetching menu options:', error);
        // You can handle the error state or display an error message
      }
    };

    fetchMenuOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/choices', { MenuOptionId: menuOptionId }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.success) {
        alert('Choice selected successfully!');
        // Optionally, you can reset the form or update the UI
      }
    } catch (error) {
      console.error('Error selecting choice:', error);
      alert('Error selecting choice');
      // You can handle the error state or display an error message
    }
  };

  return (
    <div className='slecteChoice'> 
      {user ? (
        <form onSubmit={handleSubmit}>
          <h2>Select Choice</h2>
          <select
            value={menuOptionId}
            onChange={(e) => setMenuOptionId(e.target.value)}
            required
          >
            <option value="" disabled>Select an option</option>
            {menuOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.option_name}</option>
            ))}
          </select>
          <button type="submit">Select Choice</button>
        </form>
      ) : (
        <div>You need to be logged in to access this page</div>
      )}
    </div>
  );
};

export default SelectChoice;
