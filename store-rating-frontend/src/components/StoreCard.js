import React from 'react';

const StoreCard = ({ store, onClick }) => {
  return (
    <div onClick={() => onClick(store)} style={styles.card}>
      <h3>{store.name}</h3>
      <p><strong>Address:</strong> {store.address}</p>
      <p><strong>Average Rating:</strong> {store.avgRating || 'Not rated yet'}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    margin: '10px 0',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    transition: '0.3s',
  }
};

export default StoreCard;
