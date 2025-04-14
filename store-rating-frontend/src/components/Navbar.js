import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>StoreRating</Link>

      <div>
        {user ? (
          <>
            <span style={styles.user}>Hello, {user.username}</span>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#282c34',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#61dafb',
    textDecoration: 'none',
  },
  user: {
    marginRight: '10px',
  },
  link: {
    color: '#fff',
    marginRight: '10px',
    textDecoration: 'none',
  },
  button: {
    background: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '5px 10px',
    cursor: 'pointer',
  }
};

export default Navbar;
