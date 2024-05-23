import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ViewChoices = () => {
  const [choices, setChoices] = useState([]);
  const [date, setDate] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchChoices = async () => {
      if (!date) return;

      try {
        const response = await axios.get(`/api/menus/${date}/choices`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) {
          setChoices(response.data.choices);
        }
      } catch (error) {
        console.error('Error fetching choices:', error);
        alert('Error fetching choices');
      }
    };

    fetchChoices();
  }, [date]);

  return (
    <div className="container">
      <h2>View Employee Choices</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {choices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Selected Option</th>
            </tr>
          </thead>
          <tbody>
            {choices.map((choice, index) => (
              <tr key={index}>
                <td>{choice.user.name}</td>
                <td>{choice.user.email}</td>
                <td>{choice.menuOption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No choices available for the selected date.</p>
      )}
    </div>
  );
};

export default ViewChoices;
