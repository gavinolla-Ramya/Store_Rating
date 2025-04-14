import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RateStore = ({ token }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch all stores for dropdown
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/api/store');
        setStores(res.data);
      } catch (err) {
        console.error('Failed to load stores', err);
      }
    };

    fetchStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/rating', {
        storeId: selectedStore,
        rating: rating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Rating submitted!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit rating');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Rate a Store</h2>

      <form onSubmit={handleSubmit}>
        {/* Store Selection */}
        <label className="block mb-2 font-medium">Select Store:</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          required
        >
          <option value="">-- Choose a Store --</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        {/* Star Rating */}
        <label className="block mb-2 font-medium">Rating:</label>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Rating
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default RateStore;
