UpdatePage.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import busScheduleData from './busschedule.json';
import './UpdatePage.css'; // Optional, for styling

const UpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    destination: '',
    departureLocation: '',
    route: '',
    arrivalTime: '',
    departureTime: '',
    reachingTime: ''
  });

  useEffect(() => {
    // Initialize form data with bus details
    if (location.state && location.state.bus) {
      const busDetails = location.state.bus;
      setBus(busDetails);
      setFormData({
        id: busDetails.id,
        destination: busDetails.destination,
        departureLocation: busDetails.departureLocation,
        route: busDetails.route,
        arrivalTime: busDetails.arrivalTime,
        departureTime: busDetails.departureTime,
        reachingTime: busDetails.reachingTime
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you would typically update the bus schedule data, e.g., via an API call.
    // For now, we'll just simulate the update in the local state.

    const updatedBuses = busScheduleData.buses.map(busItem =>
      busItem.id === formData.id ? { ...formData } : busItem
    );

    // Save updated buses data (you should handle this properly based on your data storage approach)
    console.log('Updated Buses:', updatedBuses);

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <div className="update-container">
      <h2>Edit Bus Route</h2>
      {bus ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Bus Number</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departureLocation">Departure Location</label>
            <input
              type="text"
              id="departureLocation"
              name="departureLocation"
              value={formData.departureLocation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="route">Route</label>
            <input
              type="text"
              id="route"
              name="route"
              value={formData.route}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrivalTime">Arrival Time</label>
            <input
              type="text"
              id="arrivalTime"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departureTime">Departure Time</label>
            <input
              type="text"
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reachingTime">Reaching Time</label>
            <input
              type="text"
              id="reachingTime"
              name="reachingTime"
              value={formData.reachingTime}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button">
            Update
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePage;
