import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({}); // { [storeId]: rating }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores');
        setStores(response.data);
      } catch (err) {
        console.error('Error fetching stores for user:', err);
      }
    };

    fetchStores();
  }, []);

  const handleRating = async (storeId, ratingValue) => {
    try {
      await api.post('/rating', { storeId, rating: ratingValue });
      setRatings((prev) => ({ ...prev, [storeId]: ratingValue }));
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rate Stores</h2>
      <div className="grid grid-cols-1 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
            <p className="text-sm mb-2">{store.address}</p>

            {/* Rating UI */}
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(store.id, star)}
                  className={`cursor-pointer text-2xl ${
                    ratings[store.id] >= star ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
