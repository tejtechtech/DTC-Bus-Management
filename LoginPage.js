LoginPage.js

import React, { useState } from 'react';
import './App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'roshan') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = '/'; // Redirect to home page after login
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Enter User-id & password</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
