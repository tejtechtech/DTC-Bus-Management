index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './LoginPage';
import UpdatePage from './UpdatePage';
import DutySchedulingPage from './DutySchedulingPage'; // Import new component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/update" element={<UpdatePage />} />
      <Route path="/duty-scheduling" element={<DutySchedulingPage />} /> {/* New route */}
    </Routes>
  </Router>
);

reportWebVitals();
