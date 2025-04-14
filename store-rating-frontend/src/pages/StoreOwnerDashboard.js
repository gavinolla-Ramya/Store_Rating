// StoreOwnerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      const response = await axios.get('http://localhost:5000/api/owner/ratings', {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in Authorization header
        }
      });
      setRatings(response.data);
    } catch (error) {
      console.error("Error fetching store ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div>
      <h1>Store Owner Dashboard</h1>
      <div>
        {ratings.map((store, index) => (
          <div key={index}>
            <h3>{store.name}</h3>
            <p>Ratings: {store.ratings.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
