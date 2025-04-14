import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      const res = await axios.get(`/api/user/store/${id}`);
      setStore(res.data);
    };
    fetchStore();
  }, [id]);

  return (
    <div>
      {store ? (
        <>
          <h2>{store.name}</h2>
          <p>{store.address}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StoreDetails;