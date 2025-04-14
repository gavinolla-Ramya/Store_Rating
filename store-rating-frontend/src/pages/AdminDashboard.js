import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StoreCard from '../components/StoreCard';

const AdminDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For creating a new store
  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    ownerId: ''
  });

  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/admin/stores');
        if (Array.isArray(response.data)) {
          setStores(response.data);
        } else if (response.data.stores && Array.isArray(response.data.stores)) {
          setStores(response.data.stores);
        } else {
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching stores:', err);
        setError('An error occurred while fetching stores.');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();

    const { name, address, ownerId } = newStore;

    if (!name || !address || !ownerId) {
      setCreateError('All fields are required');
      return;
    }

    if (name.length < 5 || name.length > 60) {
      setCreateError('Store name must be between 20 and 60 characters');
      return;
    }

    if (address.length > 400) {
      setCreateError('Address cannot exceed 400 characters');
      return;
    }

    try {
      const response = await api.post('/admin/stores', newStore);

      if (response.data) {
        setStores((prevStores) => [...prevStores, response.data]);
        setNewStore({ name: '', address: '', ownerId: '' });
        setCreateError(null);
      } else {
        setCreateError('Error creating store');
      }
    } catch (err) {
      console.error('Error creating store:', err);
      setCreateError('An error occurred while creating the store.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Create Store Form */}
      <div>
        <h3>Create New Store</h3>
        <form onSubmit={handleCreateStore}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newStore.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={newStore.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Owner ID:</label>
            <input
              type="number"
              name="ownerId"
              value={newStore.ownerId}
              onChange={handleInputChange}
            />
          </div>
          {createError && <p style={{ color: 'red' }}>{createError}</p>}
          <button type="submit">Create Store</button>
        </form>
      </div>

      {/* Display Stores */}
      <div>
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))
        ) : (
          <p>No stores available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
