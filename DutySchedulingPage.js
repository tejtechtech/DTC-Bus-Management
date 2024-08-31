DutySchedulingPage.js

import React, { useState } from 'react';
import busScheduleData from './busschedule.json'; // Import the data source
import './DutySchedulingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DutySchedulingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, isLinked } = location.state || {};
  
  const [updatedBus, setUpdatedBus] = useState(bus || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBus(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    // Update bus schedule data here
    const updatedBusList = busScheduleData.buses.map(b => 
      b.id === updatedBus.id ? updatedBus : b
    );
    // Save updatedBusList to localStorage or API
    localStorage.setItem('buses', JSON.stringify(updatedBusList));
    navigate('/');
  };

  return (
    <div className="duty-scheduling-container">
      <h2>{isLinked ? 'Linked Duty Scheduling' : 'Unlinked Duty Scheduling'}</h2>
      <form className="duty-scheduling-form">
        <label>
          Bus Number:
          <input
            type="text"
            name="id"
            value={updatedBus.id || ''}
            onChange={handleInputChange}
            disabled
          />
        </label>
        <label>
          Departure Location:
          <input
            type="text"
            name="departureLocation"
            value={updatedBus.departureLocation || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={updatedBus.destination || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Route:
          <input
            type="text"
            name="route"
            value={updatedBus.route || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Arrival Time:
          <input
            type="text"
            name="arrivalTime"
            value={updatedBus.arrivalTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Departure Time:
          <input
            type="text"
            name="departureTime"
            value={updatedBus.departureTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Reaching Time:
          <input
            type="text"
            name="reachingTime"
            value={updatedBus.reachingTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default DutySchedulingPage;
