import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const AddMenuOption = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [optionName, setOptionName] = useState('');
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('/api/menus', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          setMenus(response.data.menus);
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/menus/${selectedMenuId}/options`, { option_name: optionName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        alert('Menu option added successfully!');
        history.push('/home');
      }
    } catch (error) {
      alert('Error adding menu option');
    }
  };

  return (
    <div>
      <h2>Add Menu Option</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Menu Date:
          <select value={selectedMenuId} onChange={(e) => setSelectedMenuId(e.target.value)} required>
            <option value="" disabled>Select a date</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>{menu.date}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Option Name:
          <input
            type="text"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Option</button>
      </form>
    </div>
  );
};

export default AddMenuOption;
