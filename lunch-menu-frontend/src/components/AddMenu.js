import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddMenu = () => {
  const [date, setDate] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/menus', { date }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.success) {
        alert('Menu added successfully!');
        setDate('');
      }
    } catch (error) {
      alert('Error adding menu');
    }
  };

  if (user && user.role === 'admin') {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add Menu</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Menu</button>
      </form>
    );
  } else {
    return <div>You do not have access to this page</div>;
  }
};

export default AddMenu;
