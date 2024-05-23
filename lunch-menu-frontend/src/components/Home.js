import React from 'react';

 // Make sure you have this image in the correct directory

const Home = () => {
  const imageUrl = 'https://cdn.pixabay.com/photo/2020/02/15/20/38/noodles-4851996_640.jpg';
  return (
    <div className="home-container">
      <h1>Welcome to the Lunch Management System</h1>
      <p>Manage your daily lunch menus with ease. View today's menu, add new options, and manage your choices seamlessly.</p>
      <img src={imageUrl} alt="Delicious lunch" className="home-image" />
    </div>
  );
};

export default Home;
