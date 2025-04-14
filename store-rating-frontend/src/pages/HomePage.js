import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StoreCard from '../components/StoreCard';

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores'); // Make sure this endpoint exists in your backend
        setStores(response.data);
      } catch (err) {
        console.error('Error fetching stores:', err);
        setError('Failed to load stores.');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : stores.length > 0 ? (
        stores.map((store) => <StoreCard key={store.id} store={store} />)
      ) : (
        <p>No stores available</p>
      )}
    </div>
  );
};

export default HomePage;
